import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material"
import { bodyMinHeight, bodyOffset, headerTopPadding } from "../EventHeader"
import { AnimationPlaybackControls, Easing, stagger, useAnimate, useInView } from "framer-motion"
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import sleep from "~/util/sleep";
import { HomeSectionProps } from "~/pages/index.page";


export type SpeakerEventHomeProps = {

} & HomeSectionProps;

export default function SpeakerEventsHome(props: SpeakerEventHomeProps) {
	const {
		id,
	} = props;

	const theme = useTheme();
	const [scope, animate] = useAnimate();

	const inView = useInView(scope);
	const [playedAnimation, setPlayedAnimation] = React.useState(false);

	let cancellationToken = false;
	let currentAnimation: AnimationPlaybackControls = null;

	async function animationSequence(){
		const ease: Easing = "easeInOut";

		if(cancellationToken) return;
	}

	React.useEffect(() => {
		if(inView && !playedAnimation){
			animationSequence();
			setPlayedAnimation(true);
		}
	}, [inView, playedAnimation])

	return <Container ref={scope}
		id={id}
		maxWidth="lg"
		sx={theme => ({
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			minHeight: `calc(${bodyMinHeight(theme)})`,
		})}
	>
		<Box>
			<Typography variant="display2" component="span" className="community__header-section"
				display="block"
				sx={[animationStyle(), { mb: 4 }]}
			>
				Want to kickstart your career in the industry?
			</Typography>
			<Stack gap={2}>
				<Typography variant="h2" className="community__section" sx={animationStyle()}>
					Gain insight on the biggest hits of the decade, from indie games to triple A titles.
				</Typography>
				<Typography variant="body1" className="community__section" sx={animationStyle()}>
					Connect with leaders at top game companies, like Blizzard and Riot.
				</Typography>
				<Stack direction="row">
					<Button variant="contained" size="medium"
						className="community__section"
						sx={animationStyle()}
					>Instagram</Button>
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
