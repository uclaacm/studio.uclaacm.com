import * as React from "react";

import { useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Image, { StaticImageData } from "next/image"

import CloseButtonIcon from "~/assets/images/icons/close.svg"
import HomeButtonIcon from "~/assets/images/icons/home.svg"

import { NavBarContents } from "~/components/NavBar";

type NavBarRadialButtonProps = {
	icon: string | StaticImageData,
	rotationDeg?: number,
	shadowRotationDeg?: number,
	onActivate?: () => void,
	onDeactivate?: () => void,
}

let indexCounter = 0;

function NavBarRadialButton({icon, rotationDeg, shadowRotationDeg, onActivate, onDeactivate}: NavBarRadialButtonProps){
	++indexCounter;

	const [index, setIndex] = React.useState(indexCounter);
	const [active, setActive] = React.useState(false);
	const shadowOffset = 10;

	rotationDeg = rotationDeg ?? 0;
	const rotationRad = rotationDeg * Math.PI / 180;
	const rotation = `${rotationDeg}deg`

	shadowRotationDeg = shadowRotationDeg ?? 90;
	const shadowRotationRad = shadowRotationDeg * Math.PI / 180;

	const shadowId = `shadow-${index}`

	const onMouseEnter = () => {
		setActive(true);
		if(onActivate) onActivate();
	}

	const onMouseLeave = () => {
		setActive(false);
		if(onDeactivate) onDeactivate();
	}

	const theme = useTheme();
	return (
		<Box sx={{
			"--width": "calc(326/750*100%)",
			"--height": "calc(198/750*100%)",
			"--translate-y": active ? "135%" : "130%",
			width: "var(--width)",
			height: "var(--height)",
			position: "absolute",
			left: "calc((100% - var(--width))/2)",
			top: "calc((100% - var(--height))/2)",
			transform: `rotate(${rotation}) translate(0, calc(-1 * var(--translate-y)))`,

			transition: theme.transitions.create(["transform", "transformOrigin"], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeOut,
			}),
			pointerEvents: "none",
		}}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 248" style={{position: "absolute"}}>
				<g filter={`url(#${shadowId})`}>
					<path
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						style={{
							pointerEvents: "auto",
							fill: active ? theme.palette.primary.main : "#dee6ed",
							transition: theme.transitions.create(["fill", "filter"], {
								duration: theme.transitions.duration.shortest,
								easing: theme.transitions.easing.easeOut
							}),
							cursor: "pointer",
						}}
						d="M27.0648 82.8056C22.1796 72.8989 26.2323 60.8566 36.3776 56.4885C84.6778 35.693 136.715 24.9365 189.14 25.0003C241.248 25.0637 292.434 35.8154 339.448 56.4803C349.762 61.0139 353.591 73.455 348.206 83.3511L278.249 211.901C273.074 221.41 261.302 224.963 251.187 221.104C230.059 213.043 207.461 208.867 184.505 208.839C161.62 208.811 138.882 212.907 117.407 220.867C107.05 224.706 95.0847 220.742 90.1995 210.835L27.0648 82.8056Z"
					/>
				</g>
				<defs>
				<filter id={`${shadowId}`}
					x="0" y="0"
					width="375.64" height="247.637"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix"/>

					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset
						dy={shadowOffset * Math.sin(shadowRotationRad - rotationRad)}
						dx={shadowOffset * Math.cos(shadowRotationRad - rotationRad)}
					/>
					<feGaussianBlur stdDeviation="2.5"/>
					<feComposite in2="hardAlpha" operator="out"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_349"/>

					<feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_4_349" result="shape"/>
				</filter>
				</defs>
			</svg>
			<Box sx={{width: "100%", height: "100%", position: "absolute", display: "flex", alignItems: "center", justifyContent: "center"}}>
				<Image src={icon} alt="home" style={{
					width: "25%",
					height: "100%",
					objectFit: "contain",
					transform: `rotate(calc(-1 * ${rotation}))`
				}}/>
			</Box>
		</Box>
	)
}

export type NavBarRadialProps = {
	offsetLeft?: string,
	buttonFrequency?: number,
	buttonPhase?: number,
	contents: NavBarContents[]
}

export default function NavBarRadial({offsetLeft, contents, buttonFrequency, buttonPhase}: NavBarRadialProps){
	const [active, setActive] = React.useState(0);

	buttonFrequency ??= 60;
	buttonPhase ??= 0;

	const radialContents = contents.filter(content => content.hideInRadial !== true);

	return (
		<Box sx={theme => ({
			paddingLeft: offsetLeft ?? 0,
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		})}>
			<Box sx={{
				height: "66%",
				aspectRatio: "1",
				position: "relative",
			}}>
				<Image src={CloseButtonIcon} alt="close" style={{
					// @ts-ignore "style" doesn't allow css vars, but it works
					"--width": "40%",
					width: "var(--width)",
					height: "auto",
					aspectRatio: "1",
					position: "absolute",
					left: "calc((100% - var(--width))/2)",
					top: "calc((100% - var(--width))/2)",
				}}/>
				{radialContents.map(({buttonIcon}, i) => (
					<NavBarRadialButton key={i} rotationDeg={buttonFrequency * i + buttonPhase} icon={buttonIcon}/>
				))}
			</Box>
		</Box>
	)
}