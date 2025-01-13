import { Box, SxProps, Theme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import React from "react";

export type ImageSlideshowImage = {
	alt: string,
	image: StaticImageData,
}

export type ImageSlideshowProps = {
	images: ImageSlideshowImage[],
	sx?: SxProps<Theme>,
};

export default function ImageSlideshow(props: ImageSlideshowProps) {
	const {
		images,
		sx,
	} = props;

	const [curImageIndex, setCurImageIndex] = React.useState(0);
	const curImage = React.useMemo(() => images[curImageIndex], [curImageIndex]);

	React.useEffect(() => {
	const timeout = setTimeout(() => {
		setCurImageIndex((x) => (x + 1) % images.length);
	}, 5000);
	return () => {
		clearTimeout(timeout);
	};
	}, [curImage]);

	return <AnimatePresence initial={false}>
		<Box
			key={curImageIndex}
			component={motion.div}
			sx={[{
				overflow: "clip",
				opacity: 0,
				gridRowStart: "1",
				gridColumnStart: "1",
				zIndex: 100,
				position: "relative",
				width: "100%",
				height: "100%",
			}, ...sx instanceof Array ? sx : [sx]]}
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 16 }}
		>
			<Box
				component={Image}
				sx={{
					borderRadius: 1,
					minWidth: 0,
					minHeight: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
				src={curImage.image}
				alt={curImage.alt}
			/>
		</Box>
	</AnimatePresence>
}