import { Box, Typography, Theme, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Workshops from "./Workshops";
import GameJams from "./GameJams";
import Socials from "./Socials";
import SpeakerEvents from "./SpeakerEvents";
import E1 from "./E1";
import SRS from "./SRS";
import { HomeSectionProps } from "~/pages/index.page";

type EventsProps = {

} & HomeSectionProps;

export default function Events(props: EventsProps){
	const {
		setActive,
	} = props;

	const theme = useTheme();

	return <Box sx={{ position: "relative", minHeight: "100vh" }}>
		<Workshops setActive={setActive}/>
		<GameJams setActive={setActive}/>
		<Socials setActive={setActive}/>
		<SpeakerEvents setActive={setActive}/>
		<E1 setActive={setActive}/>
		<SRS setActive={setActive}/>
	</Box>
}
