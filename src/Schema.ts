export type ShowcaseSchema = {
	title: string,
	subtitle?: string,
	description?: string,
	date: string,
	category: string,
	img?: {
		src: string,
		alt?: string,
	},
	url: string,
	links?: { type: string, href: string }[]
};

export type OfficerSchema = {
    name: string,
    image_url: string,
    links?: { type: string, href: string, }[]
};

export type ArticleSchema = {
	title: string,
	author: string,
	description: string,
	date: string,
	image_url?: string,
	keywords?: string[],
}

export type TutorialSchema = ArticleSchema;

export type ColumnSchema = ArticleSchema;