import { JSDOM } from "jsdom";
import fs from "node:fs";
import { execSync } from "node:child_process"
import prettier from "prettier";
import assert from "node:assert";
import path from "node:path";

let verbose = false;
let quiet = false;
let help = false;
let regenerate = false;

process.argv.forEach((val, index) => {
	if (index < 2) {
		return;
	}
	if(val === "--verbose" || val === "-v"){
		verbose = true;
	}
	else if(val === "--quiet" || val === "-q"){
		quiet = true;
	}
	else if(val === "--help" || val === "-h"){
		help = true;
	}
	else if(val === "--regenerate" || val === "-r"){
		regenerate = true;
	}
	else {
		throw "Unknown argument: " + val;
	}
})

function verboseLog(...args){
	if(verbose && !quiet){
		console.log(...args);
	}
}

function verboseWarn(...args){
	if(verbose && !quiet){
		console.warn(...args);
	}
}

function log(...args){
	if(!quiet){
		console.log(...args);
	}
}

function warn(...args){
	if(!quiet){
		console.warn(...args);
	}
}

/**
 * @returns {Promise<JSDOM>}
 */
async function getItchHTML() {
	if (!regenerate && fs.existsSync("src/scrape/itch.html")) {
		log("Getting itch.io HTML... using cache");
		const html = fs.readFileSync("src/scrape/itch.html", "utf8");
		return new JSDOM(html);
	}
	else {
		log("Getting itch.io HTML... fetching itch.io...");
		const response = await fetch("https://acmstudio.itch.io");
		const text = await response.text();
		log("Caching fetch result...");
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

	log("Parsing itch.io...");
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
						verboseWarn(`No image for ${entry.title}. Discarding...`);
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
 * @type {{ command: "magick" | "cwebp", path: string } | null}
 */
let commandCache = null;

/**
 * @param {string} from
 * @param {string} to
 * @param {Object} [options]
 * @param {bool | undefined} options.quiet
 * @returns {string | null}
 */
function getImageConversionCommand(from, to, options){
	if (commandCache !== null) {
		if(commandCache.command === "magick"){
			const flags = ``;
			return `${commandCache.path} convert ${from} ${to} ${flags}`;
		}
		else if (commandCache.command === "cwebp"){
			const flags = `${options?.quiet ? "-quiet" : ""}`
			return `${commandCache.path} ${flags} -q 80 ${from} -o ${to}`;
		}
	}

	// this is on server
	if (fs.existsSync("./bin/cwebp")) {
		commandCache = { command: "cwebp", path: "./bin/cwebp" };
		verboseLog(`Using bundled cwebp`);
		return getImageConversionCommand(from, to, options);
	}

	const commands = [
		"cwebp",
		"magick",
	]

	for (const command of commands) {
		try {
			if(process.platform === "win32"){
				execSync(`where ${command}`);
			}
			else {
				execSync(`/usr/bin/which ${command}`);
			}
			commandCache = { command: command, path: command };
			verboseLog(`Using ${command}`);
			return getImageConversionCommand(from, to, options);
		} catch{}
	}

	return null;
}

/**
 * NOTE: THIS MUST BE SANITIZED!!!
 * @param {string} from
 * @param {string} to
 */
function optimizeImage(from, to){
	if(!fs.existsSync(from)){
		console.error(`File ${from} does not exist!`);
		return;
	}
	const toDir = path.dirname(to);
	if(!fs.existsSync(toDir)){
		console.error(`Directory ${toDir} does not exist!`);
		return;
	}

	const command = getImageConversionCommand(from, to, {
		quiet: !verbose
	});
	if(command === null){
		throw "No image conversion command found! Please install either CWebP or ImageMagick.";
	}
	verboseLog(`Running ${command}`);
	execSync(command);
}

/**
 * @param {Collection[]} collections
 */
async function downloadImages(collections){
	log("Downloading and optimizing images...");
	if(!fs.existsSync("src/data/itch/__generated__")){
		fs.mkdirSync("src/data/itch/__generated__");
	}
	if(!fs.existsSync("src/data/itch/__generated__/images")){
		fs.mkdirSync("src/data/itch/__generated__/images");
	}
	const promises = collections.flatMap((collection) => collection.entries.map(async (entry) => {
		if(!regenerate && fs.existsSync(`src/data/itch/__generated__/images/${fsEscape(entry.title)}.webp`)){
			verboseLog(`${entry.title} already exists. Skipping...`);
			return;
		}
		verboseLog(`Downloading ${entry.title}...`);
		const response = await fetch(entry.img);
		const buffer = await response.arrayBuffer();
		const filename = fsEscape(entry.title);
		verboseLog(`Writing ${filename}.png...`);
		fs.writeFileSync(`src/data/itch/__generated__/images/${filename}.png`, Buffer.from(buffer));
		verboseLog(`Converting ${filename}.png to ${filename}.webp...`);
		optimizeImage(
			`src/data/itch/__generated__/images/${filename}.png`,
			`src/data/itch/__generated__/images/${filename}.webp`
		);
		verboseLog(`Deleting ${filename}.png...`);
		fs.unlinkSync(`src/data/itch/__generated__/images/${filename}.png`);
	}));
	await Promise.all(promises);
}

async function scrape(){
	const collections = await getItchCollections();
	await downloadImages(collections);

	log("Generating TypeScript file...");
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

if(help){
	console.log(`Usage: node itch.mjs [--verbose/-v] [--quiet/-q] [--help/-h]`);
	console.log(`Scrape itch.io for collections, download and optimize images, and generate TypeScript file.`);
	console.log(`--verbose/-v: Enable verbose logging (for each step)`);
	console.log(`--quiet/-q: Disable all logging`);
	console.log(`--help/-h: Show this help message`);
	console.log(`--regenerate/-r: Regenerate the caches`);
}
else {
	scrape();
}
