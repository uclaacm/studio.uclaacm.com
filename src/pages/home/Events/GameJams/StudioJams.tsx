import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material"
import { bodyOffset, headerTopPadding } from "../EventHeader"
import { AnimationPlaybackControls, Easing, stagger, useAnimate, useInView } from "framer-motion"
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import sleep from "~/util/sleep";
import HeroCarousel from "~/components/HeroCarousel";
import MasonryCarousel, { MasonryCarouselCellData } from "~/components/MasonryCarousel";
import { links } from "~/Strings";


export type OurJamsProps = {

}
// const images = [
// 	"https://placehold.co/600x400?text=2",
// 	"https://placehold.co/600x400?text=3",
// 	"https://placehold.co/600x400?text=4"
// ]
//
//
const entries: MasonryCarouselCellData[] = [
	{ src: "https://img.itch.zone/aW1nLzEzNTg4NzYzLnBuZw==/315x250%23c/21lJqQ.png", href: "https://diplomaticdodo.itch.io/obby-had-a-farm", title: <>Obby had a farm<br/>LD54</> },
]

export default function StudioJams(props: OurJamsProps) {
	const theme = useTheme();
	const [scope, animate] = useAnimate();

	const inView = useInView(scope);

	let cancellationToken = false;
	let currentAnimation: AnimationPlaybackControls = null;

	async function animationSequence(){
		const ease: Easing = "easeInOut";

		await animate(".studio-jams__header", { "--animation-percent": 0 }, { duration: 0.001 });

		if(cancellationToken) return;

		currentAnimation = animate(".studio-jams__header", { "--animation-percent": 1 }, { duration: theme.transitions.duration.short / 1000 });
		await currentAnimation;
	}

	React.useEffect(() => {
		if(inView){
			animationSequence();
			return () => {
				cancellationToken = true;
				currentAnimation?.cancel();
			}
		}
	}, [inView])

	return <Container ref={scope}
		maxWidth="lg"
		sx={theme => ({
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			height: `calc(100vh - ${theme.spacing(headerTopPadding)} - ${theme.typography.h1.lineHeight})`,
		})}
	>
		<Stack sx={{ height: "100%" }}>
			<Typography component="span" variant="display1" className="studio-jams__header"
				display="block"
				sx={animationStyle()}
			>
				Past Entries
			</Typography>
			<Typography component="span" variant="h1">
				Studio organizes teams for jams to save you time.
			</Typography>
			<Typography component="span" variant="title1">
				Here are past entries from various teams!
			</Typography>
				{/*
			<Box sx={{
				flexGrow: 1,
				position: "relative",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				pb: `calc(${theme.spacing(headerTopPadding)} + ${theme.typography.h1.lineHeight})`
			}}>
					<HeroCarousel images={images}/>
			</Box>
			*/}
			<Stack
				sx={{
					flexGrow: 1,
					justifyContent: "center",
					pb: `calc(${theme.spacing(headerTopPadding)} + ${theme.typography.h1.lineHeight})`
				}}
			>
				<Box sx={{
					position: "relative",
					display: "grid",
					gridTemplate: "1fr / 1fr",
					overflow: "hidden",
				}}>
					<Box sx={{
						position: "absolute",
						zIndex: 1000,
						left: 0, top: 0, bottom: 0, width: `16px`,
						background: "radial-gradient(farthest-side at left, rgba(0,0,0,0.5), rgba(0,0,0,0))",
						pointerEvents: "none",
					}}/>
					<Box sx={{
						position: "absolute",
						zIndex: 1000,
						right: 0, top: 0, bottom: 0, width: `16px`,
						background: "radial-gradient(farthest-side at right, rgba(0,0,0,0.5), rgba(0,0,0,0))",
						pointerEvents: "none",
					}}/>
					<MasonryCarousel rows={[
							entries
					]}/>
				</Box>
				<Stack direction="row" justifyContent="end">
					<Button variant="text" href={links.itch}>
						View all past jam submissions
					</Button>
				</Stack>
			</Stack>
		</Stack>
	</Container>
}
