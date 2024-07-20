import {Container, Typography } from "@mui/material"
import React from "react";
import LearnByDoing from "./LearnByDoing";
import Resources from "./Resources";
import CurrentSeries from "./CurrentSeries";

export const headerTopPadding = 8;

export type WorkshopsProps = {

}

export default function Workshops({}: WorkshopsProps) {
	return <>
		<Container id="workshops" maxWidth="lg" sx={{
			position: "sticky",
			top: 0,
			pt: headerTopPadding,
		}}>
			<Typography variant="h1">Workshops</Typography>
		</Container>
		<LearnByDoing/>
		<Resources/>
		<CurrentSeries/>
	</>
}