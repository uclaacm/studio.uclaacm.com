import {Box, Container, Typography } from "@mui/material"
import React from "react";
import LearnByDoing from "./LearnByDoing";
import Resources from "./Resources";
import CurrentSeries from "./CurrentSeries";
import EventHeader from "../EventHeader";

export type WorkshopsProps = {

}

export default function Workshops({}: WorkshopsProps) {
	return <>
		{/*
			note: eventheader is sticky, so
			we want it to stop sticking *after* it gets
			to the last panel.
			this is why we add the box here, even
			though it does not contribute to layout
		*/}
		<Box>
			<EventHeader>Workshops</EventHeader>
			<LearnByDoing/>
			<Resources/>
		</Box>
		<CurrentSeries/>
	</>
}