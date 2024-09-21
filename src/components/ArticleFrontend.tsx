import * as React from "react"

import Container from "~/components/Container";
import Typography from "@mui/material/Typography"

import { NotionArticleSchema, NotionSchemaWithBlocks } from "~/api/notion/schema";
import joinAuthorNames from "~/util/joinAuthorNames";
import NotionBlocksRenderer from "./NotionBlockRenderer";
import Head from "next/head";
import Title from "./Title";
import { Chip, Stack } from "@mui/material";
import Link from "./Link";

export type ArticleParams = {
	baseUrl: string,
}

export type ArticleProps = {
	article: NotionSchemaWithBlocks<NotionArticleSchema>
}

export function ArticleRenderer({ baseUrl }: ArticleParams){
	return function({ article }: ArticleProps){
		if(article === undefined){
			return <></>
		}
		const { title, authors, tags, category, blocks } = article;

		const authorString = React.useMemo(() => joinAuthorNames(authors), [authors]);
		return <Container>
			<Title>{title}</Title>
			<Head>
				<meta name="author" content={joinAuthorNames(authors)}/>
			</Head>
			<Typography variant="subtitle1">{authorString}</Typography>
			<Typography variant="subtitle1"><Link href={baseUrl}>{category}</Link></Typography>
			<Typography variant="h1">{title}</Typography>
			<NotionBlocksRenderer blocks={blocks}/>
		</Container>
	}
}
