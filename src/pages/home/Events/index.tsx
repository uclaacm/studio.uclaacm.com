import { Box, Container, Stack, Typography, Theme, useTheme } from "@mui/material";
import { AnimatePresence, motion, stagger, useAnimate, useInView, Variants } from "framer-motion";
import React from "react";
import AnimatedUnderline from "~/components/AnimatedUnderline";
import Timeline, { TimelineAnimationControls } from "./Workshops/Timeline";
import Workshops from "./Workshops/Workshops";

const MotionTypography = motion(Typography);

export type HeaderProps = {
	children: string,
}

export const headerTopPadding = 8;
export const bodyOffset = (theme: Theme) => `${theme.spacing(headerTopPadding)} + ${theme.typography.h1.lineHeight}`;

export function EventHeader({ children }: HeaderProps) {
	return (
		<Typography variant="h1" sx={theme => ({
			position: "sticky",
			top: theme.spacing(headerTopPadding),
		})}>
			<AnimatePresence>
				<MotionTypography variant="inherit">
					Workshops
				</MotionTypography>
			</AnimatePresence>
		</Typography>
	)
}

export default function Events(){
	const theme = useTheme();
	const scrollMarginTop = `calc(${theme.spacing(headerTopPadding)} + ${theme.typography.h1.lineHeight})`;

	const ref = React.useRef<HTMLDivElement>();

	return <Box ref={ref} sx={{ position: "relative", minHeight: "100vh" }}>
		<Workshops/>
	</Box>
}