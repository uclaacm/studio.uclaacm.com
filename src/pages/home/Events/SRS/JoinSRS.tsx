import {
	Box,
	Button,
	Container,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import {
	AnimationPlaybackControls,
	Easing,
	stagger,
	useAnimate,
	useInView,
} from "framer-motion";
import {
	bodyMinHeight,
	bodyOffset,
	bodyPaddingBottom,
	headerTopPadding,
  } from "../EventHeader";
import React from "react";
import { animationStyle } from "~/util/framer/animation";


export type SRSHomeProps = {};

export default function SRSHome(props: SRSHomeProps) {
	const {} = props;

	const theme = useTheme();
	const [scope, animate] = useAnimate();

	const inView = useInView(scope);
	const [playedAnimation, setPlayedAnimation] = React.useState(false);

	const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	async function animationSequence() {}
	const medium = useMediaQuery(theme.breakpoints.down("md"));
	const buttonSize = medium ? "small" : "medium";


	React.useEffect(() => {
		if (inView && !playedAnimation) {
			animationSequence();
			setPlayedAnimation(true);
		}
	}, [inView, playedAnimation]);

	return (
		<Container
			maxWidth="lg"
			sx={(theme) => ({
				scrollSnapAlign: "start",
				scrollMarginTop: `calc(${bodyOffset(theme)})`,
				width: "100%",
				minHeight: `calc(${bodyMinHeight(theme)})`,
				display: "grid",
				gridTemplateColumns: isMediumScreen ? "1fr" : "1fr 1fr",
				gap: theme.spacing(4),
			})}
		>
				<Stack gap={4}>
					<Typography
						variant="display2"
						className="community__section"
						sx={[
							animationStyle(),
						]}
					>
					Join a Studio
					</Typography>
					<Stack gap={2}>
						<Typography variant="body1" component="p">
							SRS has been ACM Studio's Flagship Program for over 6 years, seeing the creation of over 50 games! SRS is perfect to grow your skills working in a group environment and create an amazing portfolio piece.
						</Typography>
						<Typography variant="body1" component="p">
							At the end, present your 2 quarters of work to over a hundred people, including industry professionals, at our Spring Showcase!
						</Typography>
						<Typography variant="body1" component="p">
							We are accepting applications now!
						</Typography>
						
					</Stack>
					<Stack direction="row" gap={1}>
						<Button
							variant="contained"
							sx={{ mr: 2 }}
							href="/students-run-studios"
						>
							Learn more!
						</Button>
						<Button
							href = "/students-run-studios"
							variant="outlined"
							size={buttonSize}

							className="community__section"
							sx={animationStyle()}
						>
							Join a Studio!
						</Button>
					</Stack>
				</Stack>

				<Box
					sx={{
						width: 600,
						height: 500,
						backgroundColor: "lightgrey",
						borderRadius: 2,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "black",
					}}
					>
					Image Placeholder
				</Box>
		</Container>
	);
}
