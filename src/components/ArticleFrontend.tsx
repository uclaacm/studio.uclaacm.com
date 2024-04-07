import * as React from "react"

import Container from "~/components/Container";
import Typography from "@mui/material/Typography"
import Markdown from "~/components/Markdown";

import { ArticleSchema } from "~/Schema"
import content from "~/__generated__/content";
import { GetStaticProps } from "next";
import { getFile } from "~/content/contentProvider";

export type ArticleProps = {
	collection: string,
	filename: string,
}

export function ArticleRenderer({ collection, filename }: ArticleProps){
	const article = getFile<ArticleSchema>(collection, filename);

	const { author, title } = article.default.frontmatter;
	return <Container>
		<Typography variant="subtitle1">{author}</Typography>
		<Typography variant="h1">{title}</Typography>
		<article.default.default />
	</Container>
}