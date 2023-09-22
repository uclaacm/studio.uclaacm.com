import * as React from "react"

import Container from "~/components/Container";
import Typography from "@mui/material/Typography"
import Markdown from "~/components/Markdown";

import { Article } from "~/components/ArticleBackend"

export type ArticleProps = {
	article: Article
}
export default function({ article: { title, author, description, body } }: ArticleProps){
	return <Container>
		<Typography variant="subtitle1">{author}</Typography>
		<Typography variant="h1">{title}</Typography>
		<Markdown content={body}/>
	</Container>
}