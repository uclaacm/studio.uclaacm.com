import React from "react";
import { bodyOffset, headerTopPadding } from "..";
import { stagger, useAnimate, useInView } from "framer-motion";
import Timeline, { TimelineAnimationControls } from "./Timeline";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import AnimatedUnderline from "~/components/AnimatedUnderline";

export type LearnByDoingProps = {

}

export default function LearnByDoing({}: LearnByDoingProps) {
	const theme = useTheme();
	const [scope, animate] = useAnimate();
	const isInView = useInView(scope, { margin: "-32px" });

	const timelineAnimateControls = React.useRef<TimelineAnimationControls>(null);

	let cancellationToken = false;

	async function animationSequence(){
		const initialTitleLayout = {
			gridTemplateColumns: "1fr auto 1fr",
			y: "30vh",
		}

		animate(".workshop__title", initialTitleLayout);
		animate(".workshop__labs", { opacity: 0, });
		animate(".workshop__labs-underline", { ["--underline-percent" as any]: 0, });
		await animate(
			".workshop__title-segment",
			{ y: [-16, 0], opacity: [0, 1], },
			{
				delay: stagger(theme.transitions.duration.complex / 1000, { startDelay: theme.transitions.duration.complex / 1000 }),
				duration: theme.transitions.duration.short / 1000,
			}
		)
		if (cancellationToken) return;

		await animate(
			".workshop__title",
			{
				gridTemplateColumns: [initialTitleLayout.gridTemplateColumns, "0fr auto 1fr"],
				y: [initialTitleLayout.y, 0],
			},
			{
				delay: theme.transitions.duration.complex / 1000,
				type: "spring",
				duration: theme.transitions.duration.short / 1000,
				bounce: 0
			}
		)

		await animate(
			".workshop__labs",
			{
				opacity: [0, 1]
			}
		)

		timelineAnimateControls.current.start();

		// await new Promise((r) => setTimeout(r, 250));

		await animate(
			".workshop__labs-underline",
			{ ["--underline-percent" as any]: 1 },
			{
				delay: theme.transitions.duration.complex / 1000,
				duration: theme.transitions.duration.short / 1000,
				ease: "circOut",
			}
		)
	}

	React.useEffect(() => {
		if(isInView){
			animationSequence();
			return () => {
				cancellationToken = true;
				timelineAnimateControls.current.reset();
			}
		}
		else {
			scope.animations.forEach(animation => animation.cancel());
		}
	}, [isInView])

	return <Container
		ref={scope}
		id="workshops"
		maxWidth="lg"
		sx={theme => ({
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			height: `calc(100vh - ${theme.spacing(headerTopPadding)} - ${theme.typography.h1.lineHeight})`,
		})}
	>
		<Typography component="div" variant="display1"
			className="workshop__title"
			display="grid"
			gridTemplateColumns="1fr auto 1fr"
			sx={{
				mb: 4
			}}
		>
			<Stack direction="row" gap={2} sx={{ gridColumn: 2, }}>
				<Box component="span" display="block" className="workshop__title-segment">Learn</Box>
				<Box component="span" display="block" className="workshop__title-segment">by doing</Box>
			</Stack>
		</Typography>
		<Typography className="workshop__labs" variant="title1" sx={{ opacity: 0, mb: 8 }}>
			Through weekly guided labs, make a{" "}
			<AnimatedUnderline className="workshop__labs-underline" activeVariant="active">complete game</AnimatedUnderline>
			{" "}in a quarter.
		</Typography>
		<Timeline controlsRef={timelineAnimateControls} tasks={[
			"Add player movement",
			"Add weapons",
			"Add enemies and AI",
			"Add procedural generation",
			"Add a boss",
		]}/>
	</Container>
}