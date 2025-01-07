export type Connections = {
	name?: string,
	date: Date,
	description?: string,
	url: string,
}

export const connections: Connections[] = [
	{
		date: new Date("6 Oct 2024"),
		url: "https://connections.swellgarfo.com/game/-O8ZLpB3IL75tYy4QSLq",
	},
	{
		date: new Date("14 Oct 2024"),
		url: "https://connections.swellgarfo.com/game/-O9B_LMWRWaoEDF4BlZs",
	},
	{
		date: new Date("7 Jan 2025"),
		url: "https://connections.swellgarfo.com/game/-OG0so5fqpM1En-I9SUi",
	},
].sort((a, b) => b.date.getTime() - a.date.getTime());