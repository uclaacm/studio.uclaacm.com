import { Box, Container, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const MotionTypography = motion(Typography);

export default function Events(){
	const topPadding = 8;

	return <Box sx={{ position: "relative" }}>
		<Container id="workshops"
			maxWidth="lg"
			sx={{
				scrollSnapAlign: "start",
				width: "100%",
				minHeight: "200vh",
				pt: topPadding,
			}}
		>
			<MotionTypography variant="h1" sx={theme => ({
				position: "sticky", top: theme.spacing(topPadding),
			})}>
				<AnimatePresence>
					<MotionTypography variant="inherit">
						Workshops
					</MotionTypography>
				</AnimatePresence>
			</MotionTypography>
		</Container>
	</Box>
}