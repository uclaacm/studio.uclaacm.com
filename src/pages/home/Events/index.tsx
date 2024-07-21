import { Box, Typography, Theme, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Workshops from "./Workshops";
import GameJams from "./GameJams";


export default function Events(){
	const theme = useTheme();

	return <Box sx={{ position: "relative", minHeight: "100vh" }}>
		<Workshops/>
		<GameJams/>
	</Box>
}