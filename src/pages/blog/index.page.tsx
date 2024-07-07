import * as React from "react";

import { GetServerSideProps } from "next";

import Container from "~/components/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "~/components/Link";
import { Divider } from "@mui/material";

import { useSprings, animated, useChain } from "@react-spring/web"
import { useTheme } from "@mui/material/styles";
import content from "~/__generated__/content";
import { ColumnSchema, TutorialSchema } from "~/Schema";
import { MDXFile, sortByModifiedDate, sortByPublishedDate } from "~/content/contentProvider";
import { toSorted } from "~/util/polyfills";
import { getArticles, NotionArticleSchema } from "~/api/notion/schema";
import { databaseIDs } from "~/api/notion/core";
import { objectGroupBy } from "~/util/polyfills";
import joinAuthorNames from "~/util/joinAuthorNames";

export const getServerSideProps: GetServerSideProps<BlogProps> = async (ctx) => {
	const articles = objectGroupBy(await getArticles(), v => v.category);
	return {
		props: {
			articles
		}
	}
}

type BlogProps = {
	articles: Partial<Record<string, NotionArticleSchema[]>>
}

type TutorialItemProps = {
	entry: NotionArticleSchema,
	hrefBaseUrl: string,
}

function ArticleEntry({ entry, hrefBaseUrl }: TutorialItemProps){
	const { title, authors, image: imageUrl, id, tags } = entry;

	const authorString = React.useMemo(() => joinAuthorNames(authors), [authors]);

	const url = `${hrefBaseUrl}/${id}`
	return <Box
		component={Link}
		href={url}
		display="flex" flexDirection="column" alignItems="stretch"
		gap={1}
		sx={{
			textDecoration: "none",
			color: "black",
			"&:hover .TutorialItem__LinkText": {
				textDecoration: "underline"
			}
		}}
	>
		<Box sx={{ aspectRatio: "16/9" }}>
			<img src={imageUrl} alt="" style={{
				minHeight: 0,
				minWidth: 0,
				width: "100%",
				height: "100%",
				objectFit: "contain"
			}}></img>
		</Box>
		<Box>
			<Box>
				<Typography variant="subtitle2" display="inline">
					{ authorString }
				</Typography>
			</Box>
			<Typography variant="h3" component="h3" color="primary.main" className="TutorialItem__LinkText">
				{ title }
			</Typography>
			<Box>
			{
				tags.at(0) && (
					<>
						<Typography variant="subtitle2" display="inline">
							{tags.join(" \u2022 ")}
						</Typography>
					</>
				)
			}
			</Box>
		</Box>
	</Box>
}

export default function Blog({ articles }: BlogProps){
	const tutorials = articles["Byte Sized Tutorials"] ?? [];
	const scoop = articles["Studio Scoop"] ?? [];
	const columns = toSorted(
		content.column as MDXFile<ColumnSchema>[],
		sortByPublishedDate
	);

	const theme = useTheme();
	const [tutorialsTrails, tutorialsApi] = useSprings(
		tutorials.length,
		(index) => ({
			from: { opacity: 0, y: "1rem" },
			to: { opacity: 1, y: "0" },
			delay: 50 * index,
			config: {
				duration: theme.transitions.duration.enteringScreen
			}
		})
	);

	const [columnTrails, columnApi] = useSprings(
		columns.length,
		(index) => ({
			from: { opacity: 0, y: "1rem" },
			to: { opacity: 1, y: "0" },
			delay: 50 * index,
			config: {
				duration: theme.transitions.duration.enteringScreen
			}
		})
	);

	return <Container>
		<Typography variant="h1" mb={4}>Blog</Typography>
		<Box
			display="grid"
			gridTemplateColumns="3fr 1px 1fr"
			columnGap={2}
			flexGrow={1}
		>
			{ /* BYTE SIZED TUTORIALS and articles */ }
			<Box>
				<Typography variant="h2" mb={2}>Byte-Sized Tutorials</Typography>
				<Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
					{tutorials.map((entry, i) => (
						<animated.div style={tutorialsTrails[i]} key={entry.id}>
							<ArticleEntry key={entry.id} entry={entry} hrefBaseUrl="byte-sized-tutorials" />
						</animated.div>
					))}
				</Box>
				<Box display="flex" justifyContent="end" mt={4}>
					<Link href="/byte-sized-tutorials" variant="title1">See all</Link>
				</Box>
			</Box>
			<Divider orientation="vertical"/>
			{ /* COLUMN */ }
			<Box height="100%">
				<Box position="sticky" top={0} height="min(100%, 100vh)">
					<Typography variant="h2" mb={2}>Column</Typography>
					<Box display="grid" gridAutoColumns="1fr" gap={2}>
						{scoop.map((entry, i) => (
							<animated.div style={columnTrails[i]} key={entry.id}>
								<ArticleEntry key={i} entry={entry} hrefBaseUrl="column" />
							</animated.div>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	</Container>
}