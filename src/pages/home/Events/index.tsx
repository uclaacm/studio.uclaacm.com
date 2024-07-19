import { Box, Container, Stack, Typography, Theme, useTheme } from "@mui/material";
import { AnimatePresence, motion, stagger, useAnimate, useInView, Variants } from "framer-motion";
import React from "react";

const MotionTypography = motion(Typography);

export type HeaderProps = {
	children: string,
}

export const headerTopPadding = 8;

export const bodyOffset = (theme: Theme) => `${theme.spacing(headerTopPadding)} + ${theme.typography.h1.lineHeight}`

export function EventHeader({ children }: HeaderProps) {
	return (
		<MotionTypography variant="h1" sx={theme => ({
			position: "sticky",
			top: theme.spacing(headerTopPadding),
		})}>
			<AnimatePresence>
				<MotionTypography variant="inherit">
					Workshops
				</MotionTypography>
			</AnimatePresence>
		</MotionTypography>
	)
}

export default function Events(){
	const theme = useTheme();
	const [scope, animate] = useAnimate();
	const isInView = useInView(scope, { margin: "-32px" });

	let cancellationToken = false;
	let animationControls = []


	async function animationSequence(){
		const initialTitleLayout = {
			gridTemplateColumns: "1fr auto 1fr",
			y: "30vh",
		}

		animate(".workshop__title", initialTitleLayout );
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
	}

	React.useEffect(() => {
		if(isInView){
			animationSequence();
			return () => {
				cancellationToken = true;
			}
		}
		else {
			scope.animations.forEach(animation => animation.cancel());
		}
	}, [isInView])

	return <Box sx={{ position: "relative" }}>
		<Container
			ref={scope}
			id="workshops"
			maxWidth="lg"
			sx={{
				scrollSnapAlign: "start",
				width: "100%",
				minHeight: "200vh",
				pt: headerTopPadding,
			}}
		>
			<EventHeader>Workshops</EventHeader>
			<Typography variant="display1"
				className="workshop__title"
				display="grid"
				gridTemplateColumns="1fr auto 1fr"
			>
				<Stack direction="row" gap={2} sx={{ gridColumn: 2, }}>
					<Box component="span" display="block" className="workshop__title-segment">Learn</Box>
					<Box component="span" display="block" className="workshop__title-segment">by doing</Box>
				</Stack>
			</Typography>
			<Stack
				justifyContent="center"
				alignItems="center"
				sx={theme => ({
					width: "100%",
					height: `calc(100vh - (${bodyOffset(theme)}))`,
					pb: `calc(${bodyOffset(theme)})`,
				})}
			>

			</Stack>
		</Container>
	</Box>
}