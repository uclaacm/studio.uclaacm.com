'use client'

import * as React from "react";

import Box from "@mui/material/Box"

import arrow from "~/assets/images/arrow.svg";

export type SelectionRect = {
	top: number,
	left: number,
	width: number,
	height: number,
	maxWidth: number,
}

export type SelectionProps = {
	selectionRef?: React.MutableRefObject<HTMLLIElement>,
	containerSelector?: string,
}

export function Selection({selectionRef, containerSelector}: SelectionProps){
	const [rect, setRect] = React.useState<SelectionRect | null>(null);
	containerSelector = containerSelector ?? ".MuiBox-root";

	const resizeObserver = new ResizeObserver((entries) => {
		if(entries.length > 0){
			const contentRect = entries[0].contentRect;
			const target = entries[0].target as HTMLLIElement;
			const boxWidth = (target.querySelector(containerSelector) as HTMLDivElement).offsetWidth;
 			setRect({
				top: target.offsetTop,
				left: target.offsetLeft,
				width: Math.min(boxWidth, contentRect.width),
				height: contentRect.height,
				maxWidth: target.offsetWidth
			})
		}
	})

	React.useEffect(() => {
		if(selectionRef.current){
			resizeObserver.disconnect();
			resizeObserver.observe(selectionRef.current);
		}
		return () => {
			resizeObserver.disconnect();
		}
	}, [selectionRef])

	if(selectionRef){
		return <Box sx={theme => ({
			borderWidth: theme.spacing(1),
			borderColor: theme.palette.primary.main,
			borderStyle: "solid",
			borderRadius: theme.shape.borderRadius,
			position: "absolute",

			top: rect?.top,
			left: rect?.left,
			width: rect?.width,
			height: rect?.height,
			maxWidth: rect?.maxWidth,

			transition: theme.transitions.create(["top", "width"], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeOut,
			}),

			pointerEvents: "none",

			zIndex: theme.zIndex.drawer + 1,

			"&:after": {
				"--size": `${theme.spacing(2)}`,
				display: "block",
				position: "absolute",
				right: `calc(-1.5*var(--size) - ${theme.spacing(0.5)})`,
				top: `calc((100% - var(--size))/2)`,
				width: `var(--size)`,
				height: `var(--size)`,
				color: "red",
				backgroundImage: `url("${arrow.src}")`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "contain",
				backgroundPosition: "center",
				content: `""`
			}
		})}/>
	}
	return null;
}