import { JSDOM } from "jsdom";
import fs from "node:fs";

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

async function scrape(){
	const collections = await getItchCollections();
	const json = JSON.stringify(collections, null, 2);
	fs.writeFileSync("src/data/itch.json", json);
}

scrape();