import * as React from "react"

import Container from "~/components/Container";
import Typography from "@mui/material/Typography"

import { NotionArticleSchema, NotionSchemaWithBlocks } from "~/api/notion/schema";
import joinAuthorNames from "~/util/joinAuthorNames";
import NotionBlocksRenderer from "./NotionBlockRenderer";

export type ArticleProps = {
	article: NotionSchemaWithBlocks<NotionArticleSchema>
}

export function ArticleRenderer({ article }: ArticleProps){
	const { title, authors, blocks } = article;

	const authorString = React.useMemo(() => joinAuthorNames(authors), [authors]);
	return <Container>
		<Typography variant="subtitle1">{authorString}</Typography>
		<Typography variant="h1">{title}</Typography>
		<NotionBlocksRenderer blocks={blocks}/>
	</Container>
}