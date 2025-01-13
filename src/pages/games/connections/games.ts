export type Category = {
	name: string,
	difficulty: 1| 2 | 3 | 4,
	entries: [string,string,string,string],
}

export type InternalGame = {
	name: string,
	date: string,
	author: string,
	categories: [Category,Category,Category,Category]
}

export type ExternalGame = {
	date: string,
	url: string,
	name?: string,
}

export type Game = InternalGame | ExternalGame;

const gamesUnsorted: Game[] = [
	{
		name: "Word",
		date: "12 January 2025",
		author: "Aubrey Clark",
		categories: [
			{
				name: "Ore in Minecraft",
				difficulty: 1,
				entries: ["Copper", "Gold", "Emerald", "Diamond"],
			},
			{
				name: "Pokemon Games",
				difficulty: 2,
				entries: ["X", "Shield", "White", "Red"],
			},
			{
				name: "Words in Legend of Zelda Games",
				difficulty: 3,
				entries: ["Sword", "Wind", "Breath", "Tears"],
			},
			{
				name: "First Words in 2024 Game Awards Winners",
				difficulty: 4,
				entries: ["Arkham", "Metaphor", "Black", "Astro"],
			},
		],
	},
	{
		date: "6 Oct 2024",
		url: "https://connections.swellgarfo.com/game/-O8ZLpB3IL75tYy4QSLq",
	},
	{
		date: "14 Oct 2024",
		url: "https://connections.swellgarfo.com/game/-O9B_LMWRWaoEDF4BlZs",
	},
	{
		date: "7 Jan 2025",
		url: "https://connections.swellgarfo.com/game/-OG0so5fqpM1En-I9SUi",
	},
];

export const games = gamesUnsorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const internalGames = games.filter((game): game is InternalGame => "name" in game);
export const externalGames = games.filter((game): game is ExternalGame => "url" in game);