import { Typography } from "@mui/material";
import { motion, MotionProps } from "framer-motion";
import React from "react";

type AnimatedUnderlineProps = React.PropsWithChildren<{
	initialVariant?: string,
	activeVariant?: string,
	className?: string,
} & Pick<MotionProps, "animate">>

export default function AnimatedUnderline(props: AnimatedUnderlineProps) {
	let {
		children,
		initialVariant = "initial",
		activeVariant = "inView",
		...rest
	} = props;

	return <Typography
		variant="inherit"
		component={motion.span}
		variants={{
			initial: { ["--underline-percent" as any]: 0 },
			inView: {
				["--underline-percent" as any]: 1, transition: {
					ease: "circInOut"
				}
			}
		}}
		initial={initialVariant}
		sx={theme => ({
			display: "inline-block",
			position: "relative",
			"&::before": {
				zIndex: -1,
				content: "''",
				position: "absolute",
				bottom: 0, left: 0, width: "100%", height: "0.08em",
				backgroundColor: theme.palette.primary.main,
				transformOrigin: "center left",
				transform: `scaleX(var(--underline-percent))`
			}
		})}
		{...rest}
	>
		{children}
	</Typography>
}