import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material"
import { bodyOffset, headerTopPadding } from "../EventHeader"
import { AnimationPlaybackControls, Easing, stagger, useAnimate, useInView } from "framer-motion"
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import sleep from "~/util/sleep";
import { links } from "~/Strings";
import UnityGif from "./UnityGif.webp"
import Image from "next/image";


export type SpeakerEventHomeProps = {

}
export default function E1Home(props: SpeakerEventHomeProps) {
	const theme = useTheme();
	const [scope, animate] = useAnimate();

	const inView = useInView(scope);

	let cancellationToken = false;
	let currentAnimation: AnimationPlaybackControls = null;

	async function animationSequence(){
		const ease: Easing = "easeInOut";

		if(cancellationToken) return;
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

	return <Box ref={scope}
		id="engr1"
		sx={theme => ({
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			minHeight: `calc(100vh - ${theme.spacing(headerTopPadding)} - ${theme.typography.h1.lineHeight})`,
			pb: 2 * headerTopPadding
		})}
	>
		<Box>
			<Container maxWidth="lg">
				<Typography variant="display2" component="span" className="community__header-section"
					display="block"
					sx={animationStyle()}
				>
					Want a more formal learning experience?
				</Typography>
			</Container>
			<Box component="section"
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					pt: 2,
				}}
			>
				<Box sx={theme => ({
					maxWidth: theme.breakpoints.values.lg / 2,
					justifySelf: "end",
					pl: 3,
				})}>
					<Stack gap={4}>
						<Typography variant="h2" className="community__section" sx={animationStyle()}>
							Get a comprehensive understanding of the Unity game engine in a classroom settings with zero experience needed.
						</Typography>
						<Typography variant="h2" className="community__section" sx={animationStyle()}>
							Work in small groups to create a game from design to production.
						</Typography>
						<Stack direction="row" gap={1}>
							<Button variant="contained" size="medium"
								href={links.e1}
								className="community__section"
								sx={animationStyle()}
							>View Course Listing</Button>
							<Button variant="outlined" size="medium"
								href={links.e1StudentProjects}
								className="community__section"
								sx={animationStyle()}
							>View past student work</Button>
						</Stack>
					</Stack>
				</Box>
				<Box sx={{
					display: "flex",
					alignItems: "center",
					minWidth: 0, minHeight: 0,
					mr: 8,
					ml: 4,
				}}>
					<Box component={Image}
						src={UnityGif} alt="The Unity Editor"
						sx={theme => ({
							height: "80%",
							minWidth: 0, minHeight: 0,
							borderRadius: theme.shape.borderRadius,
							overflow: "clip",
							objectFit: "cover",
						})}>
					</Box>
				</Box>
			</Box>
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
	</Box>
}
