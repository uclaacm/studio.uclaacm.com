import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "~/components/Link";
import { Divider } from "@mui/material";
import Title from "~/components/Title";

import { Article } from "~/components/ArticleBackend";

type ArticleEntryProps = {
	article: Article & { href: string },
}
function ArticleEntry({ article }: ArticleEntryProps){
	const imageUrl = article.image || article.image_url;
	return (
		<>
			<Box
				display="grid"
				gridTemplateColumns="1fr 2fr"
				component={Link}
				href={`${article.href}`}
				gap={2}
				sx={theme => ({
					height: theme.breakpoints.values.lg / 3 * 9 / 16,
					textDecoration: "none",
					color: "initial",
					"&:hover .ArticleEntry__LinkText": {
						textDecoration: "underline",
					}
				})}
			>
				<Box sx={{
					width: "100%",
					padding: 2
				}}>
					<img src={imageUrl} alt="" style={{
						minHeight: 0,
						minWidth: 0,
						width: "100%",
						height: "100%",
						objectFit: "contain"
					}}></img>
				</Box>
				<Box>
					{
						article.keywords?.at(0) && (
							<Typography variant="subtitle2">
								{article.keywords[0]}
							</Typography>
						)
					}
					<Typography variant="h3" component="h2" mb={1} className="ArticleEntry__LinkText">
						{article.title}
					</Typography>
					<Typography variant="subtitle1">
						By {article.author}
					</Typography>
				</Box>
			</Box>
			<Divider sx={{my: 2, "&:last-of-type": { display: "none" }}}/>
		</>
	)
}

export type ArticleListProps = {
	articles: (Article & { href: string})[],
	nextCursor: string | null,
	prevCursor: string | null,
}

export default function ByteSizedTutorials({ articles, prevCursor, nextCursor }: ArticleListProps){
	return <Container maxWidth="lg" sx={{py: 2}}>
		<Title>Byte-Sized Tutorials</Title>
		<Typography variant="h1" sx={{mb: 2}}>
			Byte-Sized Tutorials
		</Typography>
		<Stack>
			{articles.map((article, i) => <ArticleEntry article={article} key={i}/>)}
		</Stack>
		<Box display="flex">
			{prevCursor && <Box><Link href={`?cursor=${prevCursor}&dir=backward`}>Previous Page</Link></Box>}
			<Box flexGrow={1}></Box>
			{nextCursor && <Box><Link href={`?cursor=${nextCursor}&dir=forward`}>Next Page</Link></Box>}
		</Box>
	</Container>
}
