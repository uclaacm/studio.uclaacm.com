import { Box, Container, Typography, useTheme } from "@mui/material"
import { motion, useInView } from "framer-motion"


import Axolotl from "./Axolotl"
import { BoldTypographyItem, createParentVariants, UnderlineTypographyItem } from "./Animation"
import EventList from "./EventList"
import { HomeSectionProps } from "~/pages/index.page"
import React from "react"

export type MissionProps = {

} & HomeSectionProps;

export default function Mission(props: MissionProps){
	const {
		setActive,
		id
	} = props;
	const theme = useTheme();

	const root = React.useRef<HTMLDivElement>();

	const inView = useInView(root, { margin: "-64px" });
	React.useEffect(() => {
		if(inView) {
			setActive();
		}
	}, [inView]);

	const parentVariants = createParentVariants(theme);

	return (
		<Box ref={root} sx={{
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
						display: "grid", gridTemplateColumns: "2fr minmax(4rem,1fr)"
					}}>
						<Box sx={{
							gridColumnStart: 2,
							display: "flex",
							alignItems: "end",
							pr: 4,
							pb: 4,
						}}>
							<Axolotl/>
						</Box>
					</Box>
				</Box>

				<Container id={id} maxWidth="lg" sx={{
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
						viewport={{ margin: "-64px", once: true }}
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
