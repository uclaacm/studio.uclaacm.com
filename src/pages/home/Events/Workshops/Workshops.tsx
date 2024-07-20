import { Box, Container, Stack, Typography, useTheme } from "@mui/material"
import { stagger, useAnimate, useInView } from "framer-motion";
import React from "react";
import Timeline, { TimelineAnimationControls } from "./Timeline";
import AnimatedUnderline from "~/components/AnimatedUnderline";
import LearnByDoing from "./LearnByDoing";
import { bodyOffset } from "..";
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