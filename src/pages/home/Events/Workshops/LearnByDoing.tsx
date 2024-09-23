import React from "react";
import { stagger, useAnimate, useInView } from "framer-motion";
import Timeline, { TimelineAnimationControls } from "./Timeline";
import { Box, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import AnimatedUnderline from "~/components/AnimatedUnderline";
import { animationStyle } from "~/util/framer/animation";
import { bodyMinHeight, bodyOffset, headerTopPadding } from "../EventHeader";

export type LearnByDoingProps = {

}

export default function LearnByDoing({}: LearnByDoingProps) {
	const theme = useTheme();
	const [scope, animate] = useAnimate();
	const isInView = useInView(scope, { margin: "-32px" });

	const timelineAnimateControls = React.useRef<TimelineAnimationControls>(null);

	let cancellationToken = false;

	const md = useMediaQuery(theme.breakpoints.down("md"));

	async function animationSequence(){
		animate(".workshop__title", { "--animation-percent": 0, gridTemplateColumns: "1fr auto 1fr" }, { duration: 0.000001 });
		animate(".workshop__title-segment", { "--animation-percent": 0 }, { duration: 0.000001 });
		animate(".workshop__labs", { "--animation-percent": 0, });
		animate(".workshop__labs-underline", { ["--underline-percent" as any]: 0, });
		await animate(
			".workshop__title-segment",
			{ "--animation-percent": 1, },
			{
				delay: stagger(theme.transitions.duration.complex / 1000, { startDelay: theme.transitions.duration.complex / 1000 }),
				duration: theme.transitions.duration.short / 1000,
			}
		)
		if (cancellationToken) return;

		await animate(
			".workshop__title",
			{
				"--animation-percent": 1,
				gridTemplateColumns: "0fr auto 1fr"
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
				"--animation-percent": 1,
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
			display: "flex",
			flexDirection: "column",
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			pb: `calc(${bodyOffset(theme)})`,
			width: "100%",
			height: `calc(${bodyMinHeight(theme)})`,
		})}
	>
		<Typography component="div" variant="display1"
			className="workshop__title"
			display="grid"
			sx={{
				translate: `0 calc((1 - var(--animation-percent)) * 30vh)`,
				mb: 4
			}}
		>
			<Stack direction="row" gap={2} sx={{ gridColumn: 2, }}>
				<Box component="span" display="block" className="workshop__title-segment" sx={animationStyle()}>Learn</Box>
				<Box component="span" display="block" className="workshop__title-segment" sx={animationStyle()}>by doing</Box>
			</Stack>
		</Typography>
		<Typography className="workshop__labs" variant="title1" sx={{ opacity: `var(--animation-percent)`, mb: 8 }}>
			Through weekly guided labs, make a{" "}
			<AnimatedUnderline className="workshop__labs-underline" activeVariant="active">complete game</AnimatedUnderline>
			{" "}in a quarter.
		</Typography>
		<Stack justifyContent="center" sx={{ flexGrow: 1, mb: 4 }}>
			<Timeline
				width="100%"
				height="100%"
				controlsRef={timelineAnimateControls}
				tasks={
					md
					? ([
						"Add player movement",
						"Add weapons",
						"Add enemies and AI",
					])
					: ([
						"Add player movement",
						"Add weapons",
						"Add enemies and AI",
						"Add procedural generation",
						"Add a boss",
					])
				}
			/>
		</Stack>
	</Container>
}
