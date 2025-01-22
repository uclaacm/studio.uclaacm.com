import { partialShuffle } from "~/util/shuffle";
import data from "./__generated__/itch-data";
import seedrandom from "seedrandom";

const seed = "42";


export type Collection = typeof data;
export type Game = Collection[number]["entries"][number];
export type GameWithCollection = Game & { collection: Collection[number]["title"] };

export const collections = data;
export const gameJamCollections = data.filter((collection) => (
	/jam|ludum dare/i.test(collection.title)
));

export function getRandomGames(n: number): GameWithCollection[] {
	const rng = seedrandom(seed);
	const games = collections.flatMap((collection) => (
		collection.entries.map((game) => ({ ...game, collection: collection.title }))
	));
	const shuffled = partialShuffle(games, n, rng);
	return shuffled;
}

export function getRandomGameJamGames(n: number): GameWithCollection[] {
	const rng = seedrandom(seed);
	const games = gameJamCollections.flatMap((collection) => (
		collection.entries.map((game) => ({ ...game, collection: collection.title }))
	));
	const shuffled = partialShuffle(games, n, rng);
	return shuffled;
}