import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { MasonryCarouselCellData } from ".";

import ItchIcon from "~/assets/images/icons/dev/itchio-textless-white.svg"

const MotionStack = motion(Stack);
const MotionButton = motion(Button);

export type MasonryCarouselCellProps = {
	data: MasonryCarouselCellData,
	dragging: React.RefObject<boolean>
}

export default React.forwardRef<HTMLDivElement, MasonryCarouselCellProps>(
	function MasonryCarouselCell(props: MasonryCarouselCellProps, ref){
		const theme = useTheme();

		const { data, dragging } = props;
		const { src, href, title } = data;

		return <MotionStack
			justifyContent="center" alignItems="center"
			sx={theme => ({
				position: "relative",
				width: "100%", height: "100%",
				backgroundImage: `url("${src}")`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				borderRadius: theme.shape.borderRadius,
			})}
			variants={{
				default: {},
				hover: {
					transition: {
						staggerChildren: theme.transitions.duration.shortest / 1000,
					}
				}
			}}
			animate="default"
			whileHover="hover"
		>
			<Box component={motion.div}
				sx={{
					position: "absolute",
					left: 0, right: 0, top: 0, bottom: 0,
					background: `rgba(0, 0, 0, 0.5)`,
					borderRadius: "inherit",
				}}
				variants={{
					default: { opacity: 0 },
					hover: { opacity: 1 },
				}}
			/>
			{ title && <Box component={motion.div}
					sx={{
						zIndex: 1000,
					}}
					variants={{
						default: { opacity: 0, y: 16 },
						hover: { opacity: 1, y: 0 },
					}}
				>
					<Typography display="block" variant="label" color="white" textAlign="center">
						{title}
					</Typography>
			</Box>
			}
			<MotionButton variant="contained"
				draggable="false"
				variants={{
					default: { opacity: 0, y: 16 },
					hover: { opacity: 1, y: 0 },
				}}
				{...href !== undefined ? {
					href,
					target: "_blank"
				} : {}}
				startIcon={<img src={ItchIcon.src} width="24px" height="24px"></img>}
				onClick={(e) => {
					if(dragging.current) {
						e.preventDefault();
					}
				}}
			>
				View on itch
			</MotionButton>
		</MotionStack>
	}
);