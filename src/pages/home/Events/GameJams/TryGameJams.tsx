import { Box, Container, Stack, Typography, useTheme } from "@mui/material"
import { bodyOffset, headerTopPadding } from "../EventHeader"
import { AnimationPlaybackControls, stagger, useAnimate, useInView } from "framer-motion"
import React from "react";
import { animationStyle } from "~/util/framer/animation";

export type TryGameJamsProps = {

}

export default function TryGameJams(props: TryGameJamsProps) {
	const theme = useTheme();
	const [scope, animate] = useAnimate();

	const inView = useInView(scope);

	let cancellationToken = false;
	let currentAnimation: AnimationPlaybackControls = null;

	async function animationSequence(){
		if(cancellationToken) return;

		animate(".try-game-jams__header-section", { "--animation-percent": 0 }, { duration: 0.00001 });
		animate(".try-game-jams__header", {
			"--animation-percent": 0,
			gridTemplateColumns: "1fr auto 1fr",
		}, { duration: 0.00001 });

		currentAnimation = animate(
			".try-game-jams__header-section",
			{ "--animation-percent": 1 },
			{ delay: stagger(
				theme.transitions.duration.complex / 1000,
				{ startDelay: theme.transitions.duration.complex / 1000 }
			)}
		)
		await currentAnimation;

		animate(".try-game-jams__header", {
			"--animation-percent": 1,
			gridTemplateColumns: "0fr auto 1fr",
		}, {
			delay: theme.transitions.duration.complex / 1000,
			duration:theme.transitions.duration.short / 1000,
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
		id="game-jams"
		maxWidth="lg"
		sx={theme => ({
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			height: `calc(100vh - ${theme.spacing(headerTopPadding)} - ${theme.typography.h1.lineHeight})`,
		})}
	>
		<Typography variant="display1" className="try-game-jams__header"
			sx={{
				width: "100%",
				translate: `0 calc((1 - var(--animation-percent)) * 32vh)`,
				mb: 2,
			}}
		>
			<Box width="fit-content" component="span" sx={{ gridColumn: 2 }}>
				<Box component="span" className="try-game-jams__header-section"
					display="block"
					sx={animationStyle()}
				>
					Can't commit?
				</Box>
				<Box component="span" className="try-game-jams__header-section"
					display="block"
					sx={animationStyle()}
				>
					Try game jams.
				</Box>
			</Box>
		</Typography>
		<Typography variant="display2">
			Low commitment experience...
		</Typography>
		<Typography variant="title1" mb={1}>
			Game jams are frequent, weekend-long sprints. If something comes up,
			if you cannot complete your game,
			or if you find out game jams aren't for you, no problem!
		</Typography>
		<Typography variant="display2">
			with complete control...
		</Typography>
		<Typography variant="title1">
			Most game jams have few rules. Choose your own genre, artstyle,
			and software.
		</Typography>
		<Typography variant="display2">
			and your own goals.
		</Typography>
		<Typography variant="title1">
			Want to try something new? Want to create the game of your dreams?
			You define your goals in a game jam.
		</Typography>
	</Container>
}