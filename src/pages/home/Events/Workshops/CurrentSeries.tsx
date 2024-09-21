import { AnimationPlaybackControls, motion, stagger, useAnimate, useInView } from "framer-motion"
import { bodyOffset } from "../EventHeader"
import { Box, Button, Stack, SxProps, Typography, useMediaQuery, useTheme } from "@mui/material"
import { defaultParentVariants } from "~/util/framer/variants"
import { workshopSeriesPoll } from "~/links"
import React from "react"
import sleep from "~/util/sleep"

export type CurrentSeriesProps = {}

export default function CurrentSeries({}: CurrentSeriesProps) {
	const theme = useTheme();
	const [scope, animate] = useAnimate();
	const inView = useInView(scope, { margin: "-128px" });

	const medium = useMediaQuery(theme.breakpoints.down("lg"));

	let cancellationToken = false;
	let currentAnimation: AnimationPlaybackControls = null;

	async function animationSequence(){
		await animate(".check-out__title", { "--animation-percent": 0 }, {
			duration: 0.000001
		});

		await animate(".check-out__stagger-item", {
			"--animation-percent": 0,
		}, {
			duration: 0.000001
		});

		if(cancellationToken) return;

		if (medium){
			currentAnimation = animate(".check-out__title", {
				"--animation-percent": 1,
			}, {
					duration: 0.000001
			});
			await sleep(100);
		}
		else {
			await sleep(500);

			currentAnimation = animate(".check-out__title", {
				"--animation-percent": 1,
			}, {
					duration: theme.transitions.duration.short / 1000
			});
			await Promise.race([currentAnimation, sleep(100)]);
		}

		if(cancellationToken) return;

		currentAnimation = animate(".check-out__stagger-item", {
			"--animation-percent": [0, 1],
		}, {
			delay: stagger(0.1)
		});

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

	const staggerItemStyle: SxProps = {
		translate: `0 calc((var(--animation-percent) - 1) * 16px)`,
		opacity: `var(--animation-percent)`,
	}


	return <Box
		ref={scope}
		component={motion.div}
		variants={defaultParentVariants(theme)}
		initial="initial"
		whileInView={"inView"}
		viewport={{ margin: "-100px", }}
		sx={theme => ({
			display: "flex",
			flexDirection: "column",
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			minHeight: `calc(100vh - (${bodyOffset(theme)}))`,
			pb: `calc(${bodyOffset(theme)})`
		})}
	>
		<Stack justifyContent="center" alignItems="center" sx={{ height: "100%", px: 4 }}>
			<Typography variant="display2"
				className="check-out__title"
				sx={{
					mb: 4,
					position: "relative",
					scale: "calc(1 + (1 - var(--animation-percent)) * 0.5)",
					top: "calc((1 - var(--animation-percent)) * 3em)"
				}}
			>
				Check out our current series
			</Typography>
			<Box component="section" sx={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				[theme.breakpoints.down(1650)]: {
						gridTemplateColumns: "unset",
						gridTemplateRows: "auto auto",
				},
			}}>
				<Box style={{ minWidth: 0 }} className="check-out__stagger-item" sx={theme => ({
					ml: 8,
					mr: 4,
					translate: `calc((var(--animation-percent) - 1) * 8rem) 0`,
					[theme.breakpoints.down(1650)]: {
						mx: 0,
						translate: `0 calc((1 - var(--animation-percent)) * 16px)`,
					},
					// borderRadius: `0 ${theme.spacing(theme.shape.borderRadius)} ${theme.spacing(theme.shape.borderRadius)} 0`,
					borderRadius: theme.spacing(theme.shape.borderRadius),
					overflow: "clip",
					opacity: `var(--animation-percent)`,
				})}>
					<img
						src="https://images.gog-statics.com/e6cbc5d26564d089ed9f655ed5d374d2672c344a934ddb38b96aa7da52908870_product_card_v2_mobile_slider_639.jpg"
						style={{ width: "100%", height: "100%" }}
					/>
				</Box>
				<Stack justifyContent="center" sx={{ pr: `calc(50vw - ${theme.breakpoints.values.lg / 2}px)`, mr: 4 }}>
					<Typography variant="display1" className="check-out__stagger-item" sx={[staggerItemStyle]}>
						Fall 2024
					</Typography>
					<Typography variant="h1" mb={2} className="check-out__stagger-item" sx={[staggerItemStyle]}>
						Roguelike Workshop Series
					</Typography>
					<Stack mb={2} gap={1}>
						<Typography variant="body1" className="check-out__stagger-item" sx={[staggerItemStyle]}>
							Come make a shooter roguelike, similar to
							Hades, Risk of Rain, or the Binding of Isaac.
						</Typography>
						<Typography variant="body1" className="check-out__stagger-item" sx={[staggerItemStyle]}>
							Learn to create players and enemies, weapons,
							and procedural generation.
						</Typography>
					</Stack>
					<Stack direction="row" gap={1}>
						<Button href="/workshops" variant="contained" size="medium" className="check-out__stagger-item" sx={[staggerItemStyle]}>See schedule</Button>
						<Button href={workshopSeriesPoll} variant="outlined" size="medium" className="check-out__stagger-item" sx={[staggerItemStyle]}>Vote for next series</Button>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	</Box>
}
