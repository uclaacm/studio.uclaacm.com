import { ArrowRight, Forward, KeyboardArrowDown } from "@mui/icons-material"
import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material"
import { motion, Variants } from "framer-motion"

import Wordmark from "~/assets/images/wordmark_and_logo.svg"

import Axolotl from "./Axolotl"
import { BoldTypographyItem, createBoldItemVariants, createParentVariants, createUnderlineItemVariants, UnderlineTypographyItem } from "./Animation"
import EventList from "./EventList"

export type MissionProps = {

}

export default function Mission({}: MissionProps){
	const theme = useTheme();

	const parentVariants = createParentVariants(theme);

	return (
		<Box sx={{
			overflow: "clip",
		}}>
			{/* Background gradient and axolotl */}
			<Box sx={{
				position: "sticky",
				height: 0,
				top: 0,
				overflow: "visible",
				width: "100%",
				pointerEvents: "none",
			}}>
				<Box sx={{
					width: "100%", height: "100vh",
					background: "linear-gradient(to bottom, #FFFFFF00 46%, #FFC2C261 100%)",
					display: "grid", gridTemplateColumns: "2fr 1fr"
				}}>
					<Box sx={{
						gridColumnStart: 2,
						display: "flex",
						alignItems: "end",
						p: 8,
					}}>
						<Axolotl/>
					</Box>
				</Box>
			</Box>

			<Container id="mission" maxWidth="lg" sx={{
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
						Our mission is to create a community to{" "}
						<BoldTypographyItem>teach</BoldTypographyItem>,{" "}
						<BoldTypographyItem>encourage</BoldTypographyItem>, and{" "}
						<BoldTypographyItem>support</BoldTypographyItem>{" "}
						students interested in{" "}
						<UnderlineTypographyItem>all aspects</UnderlineTypographyItem>{" "}
						of game development...
					</Typography>
				</Box>
			</Container>
			<EventList/>
		</Box>
	)
}