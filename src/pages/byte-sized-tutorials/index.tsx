import * as React from "react";
import { Test, Tutorial, PageInfo } from "cms/types";
import { client } from "cms/client"

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Link from "~/components/Link";
import { Divider } from "@mui/material";
import path from "path";
import Title from "~/components/Title";

export const getServerSideProps: GetServerSideProps<ByteSizedTutorialsProps> = async ({ query }) => {
	const take = 5
	let cursor = query.cursor as string | undefined;
	const forward = query.dir !== "backward"

	const tutorialConnectionForward = (await client.queries.tutorialConnection({
		sort: "date",
		[forward ? "last" : "first"]: 2,
		...cursor ? {
			[forward ? "before" : "after"]: cursor,
		} : {}
	})).data.tutorialConnection;

	const tutorialConnectionBackwards = (await client.queries.tutorialConnection({
		sort: "date",
		[forward ? "first" : "last"]: 1,
		...cursor ? {
			[forward ? "after" : "before"]: tutorialConnectionForward.pageInfo.endCursor,
		} : {}
	})).data.tutorialConnection;

	const tutorials = tutorialConnectionForward.edges
		.map(edge => edge.node as Tutorial)
		.map(tutorial => {
			const { dir, name } = path.parse(tutorial._sys.relativePath);
			return {
				...tutorial,
				href: `/byte-sized-tutorials/${path.join(dir, name)}`
			} as TutorialEntry
		})
	return {
		props: {
			tutorials: forward ? tutorials : tutorials.reverse(),
			nextCursor: forward && tutorialConnectionForward.pageInfo.hasPreviousPage
				? tutorialConnectionForward.pageInfo.endCursor
				: !forward && tutorialConnectionBackwards.totalCount !== 0
					? tutorialConnectionForward.pageInfo.startCursor
					: null,
			prevCursor: cursor
				? forward && tutorialConnectionBackwards.totalCount !== 0
					? tutorialConnectionForward.pageInfo.startCursor
					: !forward && tutorialConnectionForward.pageInfo.hasNextPage
						? tutorialConnectionForward.pageInfo.endCursor
						: null
				: null
		}
	}
}


type TutorialItemProps = {
	tutorial: TutorialEntry,
}
function TutorialItem({ tutorial }: TutorialItemProps){
	const imageUrl = tutorial.image || tutorial.image_url;
	return (
		<>
			<Box
				display="grid"
				gridTemplateColumns="1fr 2fr"
				component={Link}
				href={`${tutorial.href}`}
				gap={2}
				sx={theme => ({
					height: theme.breakpoints.values.lg / 3 * 9 / 16,
					textDecoration: "none",
					color: "initial",
					"&:hover .TutorialItem__LinkText": {
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
						tutorial.keywords?.at(0) && (
							<Typography variant="subtitle2">
								{tutorial.keywords[0]}
							</Typography>
						)
					}
					<Typography variant="h3" component="h2" mb={1} className="TutorialItem__LinkText">
						{tutorial.title}
					</Typography>
					<Typography variant="subtitle1">
						By {tutorial.author}
					</Typography>
				</Box>
			</Box>
			<Divider sx={{my: 2, "&:last-of-type": { display: "none" }}}/>
		</>
	)
}

export type ByteSizedTutorialsProps = {
	tutorials: TutorialEntry[],
	nextCursor: string | null,
	prevCursor: string | null,
}

type TutorialEntry = Tutorial & {
	href: string,
}

export default function ByteSizedTutorials({ tutorials, prevCursor, nextCursor }: ByteSizedTutorialsProps){
	return <Container maxWidth="lg" sx={{pt: 2}}>
		<Title>Byte-Sized Tutorials</Title>
		<Typography variant="h1" sx={{mb: 2}}>
			Byte-Sized Tutorials
		</Typography>
		<Stack>
			{tutorials.map((tutorial, i) => <TutorialItem tutorial={tutorial} key={i}/>)}
		</Stack>
		<Box display="flex">
			{prevCursor && <Box><Link href={`?cursor=${prevCursor}&dir=backward`}>Previous Page</Link></Box>}
			<Box flexGrow={1}></Box>
			{nextCursor && <Box><Link href={`?cursor=${nextCursor}&dir=forward`}>Next Page</Link></Box>}
		</Box>
	</Container>
}
