import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material"
import { bodyOffset, headerTopPadding } from "../EventHeader"
import { AnimationPlaybackControls, Easing, stagger, useAnimate, useInView } from "framer-motion"
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import sleep from "~/util/sleep";

import StudioSquadsImage from "./StudioSquads.svg"
import { links } from "~/Strings";

export type StudioSquadsProps = {

}
export default function StudioSquads(props: StudioSquadsProps) {
	const theme = useTheme();
	const [scope, animate] = useAnimate();

	const inView = useInView(scope);

	let cancellationToken = false;
	let currentAnimation: AnimationPlaybackControls = null;

	async function animationSequence(){
		const ease: Easing = "easeInOut";

		if(cancellationToken) return;

		animate(
			".studio-squads__background",
			{ "--animation-percent": 0 },
			{ duration: 0.00001 }
		);
		animate(
			".studio-squads__header",
			{ "--animation-percent": 0, "--opacity": 0 },
			{ duration: 0.00001 }
		);
		await animate(
			".studio-squads__section",
			{ "--animation-percent": 0 },
			{ duration: 0.00001 },
		);

		await animate(
			".studio-squads__header",
			{ "--animation-percent": 1, "--opacity": 1 },
			{ delay: stagger(
				theme.transitions.duration.complex / 1000,
				{ startDelay: theme.transitions.duration.shortest / 1000 }
			)}
		)

		animate(".studio-squads__section", {
			"--animation-percent": 1,
		}, {
			delay: stagger(
				theme.transitions.duration.shortest / 1000,
			),
			duration:theme.transitions.duration.shortest / 1000,
		});

		await sleep(theme.transitions.duration.short);

		animate(".studio-squads__background", {
			"--animation-percent": 1,
		}, { duration: theme.transitions.duration.short / 1000 });
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
			position: "relative",
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			height: `calc(100vh - ${theme.spacing(headerTopPadding)} - ${theme.typography.h1.lineHeight})`,
		})}
	>
		{/* Background */}
		<Box
			className="studio-squads__background"
			sx={[
				theme => ({
					position: "absolute",
					left: 0, right: theme.spacing(8), top: 0, bottom: theme.spacing(8),
					pointerEvents: "none",
					display: "flex",
					justifyContent: "end",
					alignItems: "end",
				}),
				animationStyle({ translateY: 16 })
			]}
		>
			<Box component="img" src={StudioSquadsImage.src} width="600"
				sx={{
					width: "60%",
				}}
			/>
		</Box>
		<Box>
			<Typography variant="display1" component="span" className="studio-squads__header"
				display="block"
				sx={animationStyle()}
			>
				Join a Studio Squad
			</Typography>
			<Stack gap={4}>
				<Box>
					<Typography variant="h1" className="studio-squads__section" sx={animationStyle()}>
						Interested in being more involved in Studio?
					</Typography>
					<Typography variant="title1" className="studio-squads__section" sx={animationStyle()}>
						Come join a fam led by two of our officers, where you can take part in a variety of activities and form meaningful relationships {"\u{1F60E}"}.
					</Typography>
				</Box>
				<Stack direction="row">
					<Button variant="contained" size="medium"
						href={links.studioSquadForm}
						className="studio-squads__section"
						sx={animationStyle()}
					>Find your squad</Button>
				</Stack>
			</Stack>
		</Box>
		{/* <Box sx={{position: "absolute", bottom: "20vh"}}>
			<Box sx={{  width: "50vw",
				position: "relative",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}>
				<HeroCarousel images = {images}/>
			</Box>
		</Box> */}
	</Container>
}
