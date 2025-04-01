import {
	Button,
	Container,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import {
	bodyMinHeight,
	bodyOffset,
} from "../EventHeader";
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import ImageSlideshow, { ImageSlideshowImage } from "~/components/ImageSlideshow";
import AxolotlAnimation from "./AxolotlAnimation";
import BrandenLeahPitch from "./BrandenLeahPitch.webp";
import DemiPitch from "./DemiPitch.webp";
import SrsShowcase2024 from "./SrsShowcase2024.webp";

const images: ImageSlideshowImage[] = [
	{ alt: "Branden and Leah Pitching their game in 2024", image: BrandenLeahPitch },
	{ alt: "Demi Pitching their game in 2024", image: DemiPitch },
	{ alt: "SRS Showcase 2024", image: SrsShowcase2024 },
];

export type SRSHomeProps = {};

export default function SRSHome(props: SRSHomeProps) {
	const theme = useTheme();

	const md = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Container
			maxWidth="lg"
			sx={(theme) => ({
				scrollSnapAlign: "start",
				scrollMarginTop: `calc(${bodyOffset(theme)})`,
				width: "100%",
				minHeight: `calc(${bodyMinHeight(theme)})`,
				display: "grid",
				gridTemplateColumns: md ? "1fr" : "1fr 1fr",
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
						href="/srs"
					>
						Learn more!
					</Button>
					{/* <Button
						href="/srs"
						variant="outlined"
						size={buttonSize}

						className="community__section"
						sx={animationStyle()}
					>
						Join a Studio!
					</Button> */}
				</Stack>
			</Stack>
			<ImageSlideshow images={images}
				width={800}
				sx={{
					maxHeight: "75vh",
					pb: 4,
				}}
			/>
		</Container>
	);
}
