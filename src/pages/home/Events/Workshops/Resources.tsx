import { Box, Container, Stack, Theme, Typography, useTheme } from "@mui/material"
import { bodyOffset } from ".."
import Link from "~/components/Link"
import Image from "next/image"

import PaletteAndBrush from "./Palette and Brush.svg"
import { motion, Transition, Variants } from "framer-motion"
import { defaultItemVariants, defaultParentVariants } from "~/util/framer/variants"

export type ResourcesProps = {

}

type ResourceCardProps = {
	topContent: React.ReactNode,
	children: React.ReactNode,
}

const defaultTransition = (theme: Theme): Transition => ({ duration: theme.transitions.duration.shortest / 1000 });

function ResourceCard({ topContent, children }: ResourceCardProps) {
	const theme = useTheme();

	return <Box
		component={motion.section}
		variants={defaultItemVariants()}
		transition={defaultTransition(theme)}
		sx={theme => ({
			border: "4px solid",
			borderColor: theme.palette.primary.main,
			borderRadius: theme.shape.borderRadius
		})}
	>
		<Stack direction="row" justifyContent="center" alignItems="center" sx={theme => ({
			borderBottom: "4px solid",
			borderBottomColor: theme.palette.primary.main,
			p: 2,
			height: "6rem",
		})}>
			{topContent}
		</Stack>
		<Box sx={{ p: 2 }}>
			<Typography variant="body1">
				{children}
			</Typography>
		</Box>
	</Box>
}

export default function Resources({ }: ResourcesProps) {
	const theme = useTheme();

	const parentVariants = defaultParentVariants(theme);

	return <Container
		component={motion.div}
		variants={parentVariants}
		initial="initial"
		whileInView={"inView"}
		viewport={{ margin: "-100px", }}
		maxWidth="lg"
		sx={theme => ({
			display: "flex",
			flexDirection: "column",
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			height: `calc(100vh - (${bodyOffset(theme)}))`,
		})}
	>
		<Typography variant="display1"
			sx={{
				mb: 4
			}}
		>
			Resources
		</Typography>
		<Typography variant="title1"
			component={motion.p}
			variants={defaultItemVariants({ transitionY: false})}
			transition={defaultTransition(theme)}
		>
			We provide a collection of resources to help you.
		</Typography>
		<Container maxWidth="md" sx={theme => ({
			flexGrow: 1,
			display: "flex",
			alignItems: "center",
			pb: `calc(${bodyOffset(theme)})`,
		})}>
			<Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
				<ResourceCard topContent={
					<Typography variant="h2" component="span">{"</>"}</Typography>
				}>
					Miss a week? Each week's workshop's code is available on{" "}
					<Link href="https://github.com/uclaacm/studio-roguelike-workshop">GitHub</Link>.
				</ResourceCard>
				<ResourceCard topContent={
					<Image src={PaletteAndBrush} height="128" alt="Palette and Brush" style={{ height: "100%" }} />
				}>
					Not an artist? We supply default art for every assets you need, so you can focus on
					your strengths!
				</ResourceCard>
				<ResourceCard topContent={
					<Typography variant="h2" component="span">?</Typography>
				}>
					Want to learn more? Have a look at our{" "}
					<Link href="/workshops">external resources</Link>
					{" "}for every tool used in the workshop.
				</ResourceCard>
			</Box>
		</Container>
	</Container>
}