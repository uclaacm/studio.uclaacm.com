import * as React from "react";
import { Tutorial } from "cms/types";
import { client } from "cms/client"

import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

type TutorialItemProps = {
	tutorial: Tutorial
}
function TutorialItem({tutorial}: TutorialItemProps){
	return (
		<Grid xs={4}>
			<Card>
				<CardMedia
					sx={theme => ({maxHeight: theme.breakpoints.values.lg / 3 * 9 / 16})}
				/>
				<CardContent>
					<Typography variant="h2">
						{tutorial.title}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}

export type ByteSizedTutorialsProps = {
	tutorials: Tutorial[]
}

export default function ByteSizedTutorials({tutorials}: ByteSizedTutorialsProps){
	return <Container maxWidth="lg" sx={{pt: 2}}>
		<Typography variant="h1" sx={{mb: 2}}>
			Byte Sized Tutorials
		</Typography>
		<Box>
			<Grid container>
				{tutorials.map(tutorial => <TutorialItem tutorial={tutorial} key={tutorial.id}/>)}
			</Grid>
		</Box>
	</Container>
}

export async function getServerSideProps({}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ByteSizedTutorialsProps>> {
	const tutorials = (await client.queries.tutorialConnection()).data.tutorialConnection.edges.map(edge => edge.node as Tutorial);
	return {
		props: {
			tutorials: tutorials
		}
	}
}