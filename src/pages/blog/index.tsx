import * as React from "react";
import { Tutorial, Column } from "cms/types";
import { client } from "cms/client"

import { GetServerSideProps } from "next";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "~/components/Link";
import { Divider } from "@mui/material";
import path from "path";

import { useSprings, animated, useChain } from "@react-spring/web"
import { useTheme } from "@mui/material/styles";

export type ArticleEntry = (Tutorial | Column) & { href: string }

export const getServerSideProps: GetServerSideProps<BlogProps> = async (ctx) => {
	const tutorials = (await client.queries.tutorialConnection({
			sort: "date",
		}))
		.data.tutorialConnection.edges
		.map(edge => edge.node as Tutorial)
		.map(tutorial => {
			const { dir, name } = path.parse(tutorial._sys.relativePath);
			return {
				...tutorial,
				href: `/byte-sized-tutorials/${path.join(dir, name)}`
			} as ArticleEntry
		})

	const columns = (await client.queries.columnConnection({ sort: "date" }))
		.data.columnConnection.edges
		.map(edge => edge.node as Column)
		.map(column => {
			const { dir, name } = path.parse(column._sys.relativePath);
			return {
				...column,
				href: `/column/${path.join(dir, name)}`
			} as ArticleEntry
		})
	return {
		props: {
			tutorials: tutorials.reverse().slice(0, 6),
			columns: columns.reverse().slice(0, 6),
		}
	}
}

type BlogProps = {
	tutorials: ArticleEntry[],
	columns: ArticleEntry[],
}

type TutorialItemProps = {
	entry: ArticleEntry
}

function TutorialItem({ entry }: TutorialItemProps){
	const imageUrl = entry.image || entry.image_url;
	return <Box
		component={Link}
		href={entry.href}
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
				{
					entry.keywords?.at(0) && (
						<>
							<Typography variant="subtitle2" display="inline">
								{entry.keywords[0]}
							</Typography>
							<Typography variant="subtitle2" display="inline" mx={1}>
								{"\u2022"}
							</Typography>
						</>
					)
				}
				<Typography variant="subtitle2" display="inline">
					{entry.author}
				</Typography>
			</Box>
			<Typography variant="h4" component="h3" color="primary.main" className="TutorialItem__LinkText">
				{ entry.title }
			</Typography>
		</Box>
	</Box>
}

export default function Blog({ tutorials, columns }: BlogProps){
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

	return <Container sx={{ pt: 2, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
						<animated.div style={tutorialsTrails[i]}>
							<TutorialItem key={i} entry={entry} />
						</animated.div>
					))}
				</Box>
				<Box display="flex" justifyContent="end" mt={4}>
					<Link href="/byte-sized-tutorials" variant="h5">See all</Link>
				</Box>
			</Box>
			<Divider orientation="vertical"/>
			{ /* COLUMN */ }
			<Box height="100%">
				<Box position="sticky" top={0} height="min(100%, 100vh)">
					<Typography variant="h2" mb={2}>Column</Typography>
					<Box display="grid" gridAutoColumns="1fr" gap={2}>
						{columns.map((entry, i) => (
							<animated.div style={columnTrails[i]}>
								<TutorialItem key={i} entry={entry} />
							</animated.div>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	</Container>
}