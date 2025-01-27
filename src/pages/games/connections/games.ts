export type Category = {
	name: string,
	difficulty: 1| 2 | 3 | 4,
	entries: [string,string,string,string],
}

export type InternalGame = {
	date: string,
	author: string,
	name: string,
	categories: [Category,Category,Category,Category]
}

export type ExternalGame = {
	date: string,
	author: string,
	name?: string,
	url: string,
}

export type Game = InternalGame | ExternalGame;

const gamesUnsorted: Game[] = [
	{
		name: "Extreme Demon",
		date: "26 January 2025",
		author: "Zandy Zhao",
		categories: [
			{
				name: "NPC TURNS CURRENCY INTO STRENGTH",
				difficulty: 1,
				entries: ["BLOODBORNE", "DARK SOULS II", "DARK SOULS III", "ELDEN RING"],
			},
			{
				name: "CONTAINS A BOSS THAT'S VERY EASILY PARRIABLE",
				difficulty: 2,
				entries: ["DARK SOULS", "MGR REVENGENCE", "SEKIRO", "SPACE MARINE 2"],
			},
			{
				name: "GAMES WITH A SWORDSMAN AS ONE OF THE BEST CHARACTERS",
				difficulty: 3,
				entries: ["BALDUR'S GATE 3", "BATMAN: ARKHAM KNIGHT", "DARKEST DUNGEON", "RUINED KING"],
			},
			{
				name: "GAMES THAT CAN BE VERY FRUSTRATING TO PLAY DEPENDING ON YOUR TEAMMATES",
				difficulty: 4,
				entries: ["MARVEL RIVALS", "BRAWL STARS", "TITANFALL 2", "DEEP ROCK GALACTIC"],
			},
		],
	},
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
		author: "Aubrey Clark",
		url: "https://connections.swellgarfo.com/game/-O8ZLpB3IL75tYy4QSLq",
	},
	{
		date: "14 Oct 2024",
		author: "Aubrey Clark",
		url: "https://connections.swellgarfo.com/game/-O9B_LMWRWaoEDF4BlZs",
	},
	{
		date: "7 Jan 2025",
		author: "Aubrey Clark",
		url: "https://connections.swellgarfo.com/game/-OG0so5fqpM1En-I9SUi",
	},
];

export const games = gamesUnsorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const internalGames = games.filter((game): game is InternalGame => "name" in game);
export const externalGames = games.filter((game): game is ExternalGame => "url" in game);
