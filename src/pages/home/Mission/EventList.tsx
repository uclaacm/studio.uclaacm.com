import { Box, Container, Stack, Typography, TypographyProps, useTheme } from "@mui/material";
import { motion, motionValue, useSpring } from "framer-motion";
import { BoldTypographyItem, createParentVariants } from "./Animation";
import { ArrowRight } from "@mui/icons-material";
import React from "react";

const MotionTypography = motion<TypographyProps & { component: string }>(Typography);

export default function EventList(){
	const links = [
		{ name: "Workshops", anchor: "#workshops" },
		{ name: "Game Jams", anchor: "#game-jams" },
		{ name: "Socials", anchor: "#socials" },
		{ name: "Industry Speakers", anchor: "#speakers" },
		{ name: "Game Dev Course (ENGR 1GD)", anchor: "#engr1" },
		{ name: "Students Run Studios", anchor: "#srs" },
	]

	const theme = useTheme();

	const parentVariants = createParentVariants(theme);

	const arrowY = motionValue(0);
	const arrowYSpring = useSpring(
		arrowY,
		{
			duration: 200,
			bounce: 0.3,
		}
	);

	return (
		<Container id="event-list" maxWidth="lg" sx={{
			scrollSnapAlign: "start",
			height: "100vh",
			display: "flex",
			alignItems: "center",
			gridRowStart: 1, gridColumnStart: 1,
		}}>
			<Box sx={{
				maxWidth: "66%"
			}}>
				<Typography component={motion.p} variant="display2"
					variants={parentVariants} initial="initial" whileInView="inView"
					transition={{ duration: theme.transitions.duration.short / 1000 }}
					sx={{ display: "block"}}
				>
					...and we hold a variety of events that can{" "}
					<BoldTypographyItem>help you dive deeper</BoldTypographyItem>
					{" "}into game dev!
				</Typography>
				<Stack component={motion.div} layout layoutRoot direction="row"
					variants={{
						initial: { },
						inView: {
							transition: {
								delay: 2 * theme.transitions.duration.enteringScreen / 1000,
								delayChildren: 3 * theme.transitions.duration.enteringScreen / 1000,
								staggerChildren: theme.transitions.duration.shortest / 1000 / 2,
							}
						},
					}}
					initial="initial"
					whileInView="inView"
				>
					{/* relative position here to use offsetTop relative to this stack */}
					<Stack order={2} position="relative" alignItems="start">
						{links.map(({ name, anchor }, i) => (
							<Typography key={name}
								display="block"
								variant="title1" color="primary"
								href={anchor}
								component={motion.a} layout
								variants={{
									initial: { height: 0, opacity: 0, y: 16 },
									inView: { height: "auto", opacity: 1, y: 0 },
								}}
								onHoverStart={(ev) => {
									arrowY.set((ev.target as HTMLAnchorElement).offsetTop)
								}}
							>{name}</Typography>
						))}
					</Stack>
					{/* The arrow */}
					<Box order={1}>
						<MotionTypography variant="title1" color="primary" component="span"
							sx={{
								display: "block",
								pt: "0.1em"
							}}
							variants={{
								initial: { height: 0, opacity: 0 },
								inView: { height: "auto", opacity: 1 },
							}}
							style={{ y: arrowYSpring }}
							transition={{ duration: 0.1 }}
						>
							<ArrowRight fontSize="inherit" sx={{ display: "block" }}/>
						</MotionTypography>
					</Box>
				</Stack>
			</Box>
		</Container>
	)
}