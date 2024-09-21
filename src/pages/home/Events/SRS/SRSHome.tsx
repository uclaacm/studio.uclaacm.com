import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material"
import { bodyOffset, headerTopPadding } from "../EventHeader"
import { AnimationPlaybackControls, Easing, stagger, useAnimate, useInView } from "framer-motion"
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import sleep from "~/util/sleep";
import { links } from "~/Strings";
import Image from "next/image";

const flagEmoji = '\u{1F6A9}'

function Flag(){
	return <Box component="span" className="srs__header-flag" sx={{
		display: "inline-block",
		transform: "rotate(calc(sin(var(--animation-percent) * 720deg) * 20deg))"
	}}>{flagEmoji}</Box>
}

export type SRSHomeProps = {

}

export default function SRSHome(props: SRSHomeProps) {
	const theme = useTheme();
	const [scope, animate] = useAnimate();

	const inView = useInView(scope);

	let cancellationToken = false;
	let currentAnimation: AnimationPlaybackControls = null;

	async function animationSequence(){
		const ease: Easing = "easeInOut";

		await animate(".srs__header-flag", {
			"--animation-percent": 0
		}, {
			duration: 0.0001
		});

		if(cancellationToken) return;

		await sleep(500);

		await animate(".srs__header-flag", {
			"--animation-percent": 1
		}, {
			duration: 6 * theme.transitions.duration.complex / 1000,
		});
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
		id="srs"
		sx={theme => ({
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			height: `calc(100vh - ${theme.spacing(headerTopPadding)} - ${theme.typography.h1.lineHeight})`,
		})}
	>
		<Typography variant="subtitle1" component="span" className="srs__header" display="block">
			ACM Studio's <Flag/> Flagship Program <Flag/>
		</Typography>
		<Stack gap={4}>
			<Typography variant="display2" className="community__section" sx={animationStyle()}>
				Interested in joining something bigger?
			</Typography>
		</Stack>
	</Container>
}
