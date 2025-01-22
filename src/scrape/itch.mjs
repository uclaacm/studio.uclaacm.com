import { JSDOM } from "jsdom";
import fs from "node:fs";
import { execSync } from "node:child_process"
import prettier from "prettier";
import assert from "node:assert";

/**
 * @returns {Promise<JSDOM>}
 */
async function getItchHTML() {
	if (fs.existsSync("src/scrape/itch.html")) {
		const html = fs.readFileSync("src/scrape/itch.html", "utf8");
		return new JSDOM(html);
	}
	else {
		const response = await fetch("https://acmstudio.itch.io");
		const text = await response.text();
		fs.writeFileSync("src/scrape/itch.html", text);
		return new JSDOM(text);
	}
}

/**
 * @typedef {{ title: string, href: string, entries: { title: string, href: string, img: string, }[] }} Collection
 */

/**
 * @returns {Promise<{ title: string, href: string, entries: { title: string, href: string, img: string, }[] }[]>}
 */
async function getItchCollections() {
	const dom = await getItchHTML();
	const document = dom.window.document;

	const collections = [...document.querySelectorAll(".collection_row")]
		.map((collectionRow) => {
			const header = collectionRow.querySelector("h2");
			const link = header.querySelector("a");
			const href = link.getAttribute("href");
			const title = link.textContent.trim();

			const entries = [...collectionRow.querySelectorAll(".game_cell")]
				.map((gameCell) => {
					const titleElement = gameCell.querySelector(".title");
					const href = titleElement.getAttribute("href");
					const title = titleElement.textContent.trim();

					const imgElement = gameCell.querySelector("img");
					const img = imgElement === null
						? null
						: imgElement.getAttribute("src") ?? imgElement.dataset["lazy_src"];

					return { title, href, img };
				})
				.filter((entry) => {
					if(entry.img === null){
						console.warn(`No image for ${entry.title}. Discarding...`);
						return false;
					}
					return true;
				});

			return { title, href, entries };
		})
	return collections;
}

function fsEscape(str){
	return str
		.replace(/[\W]/g, "_");
}

/**
 * NOTE: THIS MUST BE SANITIZED!!!
 * @param {string} args
 */
function optimizeImage(from, to){
	// NO SHELL INJECTIONS FOR THIS WEBSITE
	assert(/^[a-zA-Z0-9_\-\.]+$/.test(from));
	assert(/^[a-zA-Z0-9_\-\.]+$/.test(to));
	// if file exists in ./bin/cwebp
	if(fs.existsSync(`./bin/cwebp`)){
		execSync(`./bin/cwebp -q 80 ${from} -o ${to}`);
	}
	else {
		execSync(`magick convert ${from} ${to}`);
	}
}

/**
 * @param {Collection[]} collections
 */
async function downloadImages(collections){
	if(!fs.existsSync("src/data/itch/__generated__")){
		fs.mkdirSync("src/data/itch/__generated__");
	}
	if(!fs.existsSync("src/data/itch/__generated__/images")){
		fs.mkdirSync("src/data/itch/__generated__/images");
	}
	const promises = collections.flatMap((collection) => collection.entries.map(async (entry) => {
		if(fs.existsSync(`src/data/itch/__generated__/images/${fsEscape(entry.title)}.webp`)){
			console.log(`${entry.title} already exists. Skipping...`);
			return;
		}
		console.log(`Downloading ${entry.title}...`);
		const response = await fetch(entry.img);
		const buffer = await response.arrayBuffer();
		const filename = fsEscape(entry.title);
		console.log(`Writing ${filename}.png...`);
		fs.writeFileSync(`src/data/itch/__generated__/images/${filename}.png`, Buffer.from(buffer));
		console.log(`Converting ${filename}.png to ${filename}.webp...`);
		optimizeImage(
			`src/data/itch/__generated__/images/${filename}.png`,
			`src/data/itch/__generated__/images/${filename}.webp`
		);
		console.log(`Deleting ${filename}.png...`);
		fs.unlinkSync(`src/data/itch/__generated__/images/${filename}.png`);
	}));
	await Promise.all(promises);
}

async function scrape(){
	const collections = await getItchCollections();
	await downloadImages(collections);
	// const
	const imageImports = collections.flatMap(
		({entries}, collectionIdx) => entries.map(
			({title}, entryIdx) => `import img${collectionIdx}_${entryIdx} from ${JSON.stringify(`./images/${fsEscape(title)}.webp`)};`
		)
	);
	const collectionsJson = collections.map(({entries, ...collection}, collectionIdx) => `
		{
			title: ${JSON.stringify(collection.title)},
			href: ${JSON.stringify(collection.href)},
			entries: [
				${entries.map((entry, entryIdx) => `
					{
						title: ${JSON.stringify(entry.title)},
						href: ${JSON.stringify(entry.href)},
						img: img${collectionIdx}_${entryIdx},
					}
				`).join(",\n")}
			],
		}
	`);

	const ts = `
		${imageImports.join("\n")}
		export default [
			${collectionsJson.join(",\n")}
		];
	`;
	fs.writeFileSync(
		"src/data/itch/__generated__/itch-data.ts",
		await prettier.format(ts, { parser: "typescript" })
	);
}

scrape();