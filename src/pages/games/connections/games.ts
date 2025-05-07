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
		name: "Zandy's Zingers",
		date: "7 May 2025",
		author: "Zandy Zhao",
		categories: [
			{
				name: "Baddies (Female (THESE ARE NOT MY PERSONAL OPINIONS I DO NOT CLAIM THEM)",
				difficulty: 1,
				entries: ["Firefly (THE SUIT ONLY)", "Yuri Claude", "Scout's mom", "Grace Howard"],
			},
			{
				name: "Bad Games",
				difficulty: 2,
				entries: ["Brawl Stars", "Valorant", "League of Legends", "Genshin Impact"],
			},
			{
				name: "Baddies (Male) (these are facts)",
				difficulty: 3,
				entries: ["Zandy Zhao", "Neuvillette", "Solemn Lament Yi Sang", "bbno$"],
			},
			{
				name: "Bad Feelings",
				difficulty: 4,
				entries: ["Letting go of a connection that could've easily been repaired with simply communication", "Missing a headshot", "Losing", "Playing Valorant"],
			},
		]
	},
	{
		name: "Sparks Line(s) High",
		date: "7 May 2025",
		author: "Zandy Zhao",
		categories: [
			{
				name: "Minos Prime",
				difficulty: 1,
				entries: ["Die", "Crush", "Thy end is now", "Weak"],
			},
			{
				name: "Firefist Office Survivor Gregor",
				difficulty: 2,
				entries: ["They're all from our Office...", "What'd I say, big sis?", "... serve revenge piping hot!", "...I can almost see them again."],
			},
			{
				name: "Silence (Arknights)",
				difficulty: 3,
				entries: ["Doctor, you're kinder these days.", "...This news brings me even greater joy than my promotion.", "Zzzz...", "My hope is to rid the world of Oripathy... even if it means risking my life in the process."],
			},
			{
				name: "Dreadnought (Space Marines 2)",
				difficulty: 4,
				entries: ["Lead me to the slaughter.", "Vile sons of Magnus! Is he here!?", "...empty threats logged", "...I cast you DOWN!"],
			},
		]
	},
	{
		name: "Enemies: Phase 2",
		date: "5 May 2025",
		author: "Andrew Douglas",
		categories: [
			{
				name: "Under the Sea",
				difficulty: 1,
				entries: ["Elder Guardian", "Blooper", "Ghost Leviathan", "River Zora"],
			},
			{
				name: "Enemies You Recruit",
				difficulty: 2,
				entries: ["Dante", "Magus", "Eternatus", "Necromancer (Castle Crashers)"],
			},
			{
				name: "Dark Reflection",
				difficulty: 3,
				entries: ["SA-X", "Shadow the Hedgehog", "Mr. L.", "Dark Pit"],
			},
			{
				name: "Knock Them, Finish Them",
				difficulty: 4,
				entries: ["Koopa Troopa", "Bokoblin", "Mummy (Stardew Valley)", "Clicker (TLOU)"],
			},
		]
	},
	{
		name: "Chains (of Others)",
		date: "13 April 2025",
		author: "Zandy Zhao",
		categories: [
			{
				name: "Limbus Company",
				difficulty: 1,
				entries: ["FACE", "THE SIN", "SAVE", "THE EGO"],
			},
			{
				name: "Ultrakill",
				difficulty: 2,
				entries: ["MANKIND", "IS DEAD", "BLOOD", "IS FUEL"],
			},
			{
				name: "Warhammer 40K",
				difficulty: 3,
				entries: ["only", "in death", "does", "duty end"],
			},
			{
				name: "Fallout (slightly paraphrased)",
				difficulty: 4,
				entries: ["War", "never changes", "but", "men do"],
			},
		]
	},
	{
		name: "Pokemon 2",
		date: "5 Mar 2025",
		author: "Andrew Douglas",
		categories: [
			{
				name: "Pokemon That Can Learn Heavy Slam",
				difficulty: 1,
				entries: ["Snorlax", "Aggron", "Hariyama", "Dhelmise"],
			},
			{
				name: "Baby Pokemon",
				difficulty: 2,
				entries: ["Munchlax", "Bonsly", "Togepi", "Budew"],
			},
			{
				name: "Pokemon That Are Immune to Ground Types",
				difficulty: 3,
				entries: ["Azelf", "Hydreigon", "Pidgeot", "Shedinja"],
			},
			{
				name: "Ride Pokemon",
				difficulty: 4,
				entries: ["Tauros", "Basculegion", "Koraidon", "Miraidon"],
			},
		]
	},
	{
		name: `Peak\u00E9mon`,
		date: "10 Feb 2025",
		author: "Matthew Workman",
		categories: [
			{
				name: "Legendary Pokemon",
				difficulty: 1,
				entries: ["Mewtwo", "Okidogi", "Rayquaza", "Calyrex"],
			},
			{
				name: "Bug Type Pokemon",
				difficulty: 2,
				entries: ["Galvantula", "Orbeetle", "Grubbin", "Centiskorch"],
			},
			{
				name: "Champion Aces",
				difficulty: 3,
				entries: ["Volcarona", "Metagross", "Garchomp", "Kingambit"],
			},
			{
				name: "Pokemon used by Hatsune Miku Crossover",
				difficulty: 4,
				entries: ["Flygon", "Jirachi", "Obstagoon", "Rotom"],
			},
		]
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
		name: "Enemy",
		date: "27 Jan 2025",
		author: "Aubrey Clark",
		categories: [
			{
				name: "Enemies in Mario",
				difficulty: 1,
				entries: ["Goomba", "Bom-omb", "Boo", "Piranha"],
			},
			{
				name: "Final Bosses",
				difficulty: 2,
				entries: ["Ender Dragon", "GLaDOS", "Hades", "Bowser"],
			},
			{
				name: "Bosses who fight with friends",
				difficulty: 3,
				entries: ["Mantis Lord", "Theseus", "Trigger Twin", "Godskin Apostle"],
			},
			{
				name: "Boney Enemies",
				difficulty: 4,
				entries: ["Stalnox", "Drybones", "Sans", "Skeleton"],
			},
		]
	},
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
