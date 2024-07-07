import { Theme, Typography, useTheme } from "@mui/material";
import { motion, Variants } from "framer-motion";

export const createParentVariants = (theme: Theme) => ({
	initial: {
		opacity: 0,
		y: -16,
		transition: { duration: 5 },
	},
	inView: {
		opacity: 1, y: 0,
		transition: {
			delay: theme.transitions.duration.short / 1000,
			duration: theme.transitions.duration.shortest / 1000,
			delayChildren: 2 * theme.transitions.duration.shortest / 1000,
			staggerChildren: theme.transitions.duration.shortest / 1000,
		}
	}
})

export const createBoldItemVariants = (theme: Theme) => ({
	initial: { opacity: 0, y: -16 },
	inView: { opacity: 1, y: 0 }
})

export const createUnderlineItemVariants = (theme: Theme) => ({
	initial: { ["--underline-percent" as any]: 0 },
	inView: {
		["--underline-percent" as any]: 1, transition: {
			ease: "circInOut"
		}
	}
})

export const BoldTypographyItem = ({ children }: { children: string }) => {
	const theme = useTheme();
	return (
		<Typography component={motion.span} variant="inherit" color="primary"
			variants={createBoldItemVariants(theme)}
			sx={{ display: "inline-block" }}
		>
			{children}
		</Typography>
	)
}

export const UnderlineTypographyItem = ({ children }: { children: string }) => {
	const theme = useTheme();
	return (<Typography component={motion.span} variant="inherit"
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
		variants={createUnderlineItemVariants(theme)}
	>
		{children}
	</Typography>)
}