import { Theme } from "@mui/material";
import { Variants } from "framer-motion";

export function defaultParentVariants(theme: Theme): Variants {
	return {
		initial: {},
		inView: {
			transition: {
				delayChildren: theme.transitions.duration.short / 1000,
				staggerChildren: theme.transitions.duration.complex / 1000,
			}
		},
	}
}


export type ItemVariantsOptions = {
	transitionY?: boolean,
}

export function defaultItemVariants(options: ItemVariantsOptions = {}) {
	const {
		transitionY = true,
	} = options;
	return {
		initial: { opacity: 0, ...transitionY ? { y: 16 } : {} },
		inView: { opacity: 1, ...transitionY ? { y: 0 } : {} },
	}
}