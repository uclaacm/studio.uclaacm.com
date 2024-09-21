import { styled } from "@mui/material/styles"
import MUIIconButton, { IconButtonTypeMap, IconButtonProps as MUIIconButtonProps } from "@mui/material/IconButton"
import { ButtonBaseProps, ButtonProps, ExtendButtonBase, ExtendButtonBaseTypeMap, PaletteColor } from "@mui/material"
import { motion, MotionProps } from "framer-motion"
import { OverridableComponent, OverridableTypeMap, OverrideProps } from "@mui/material/OverridableComponent"
import React from "react"
import { useTheme } from "@mui/material"


export type IconButtonProps = {
	variant?: Exclude<ButtonProps["variant"], "text">,
}

/** @ts-ignore */
const IconButton = styled(MUIIconButton)<IconButtonProps>(({ theme, color, variant }) => {
	const paletteColor = theme.palette[(color === undefined || color === "default" || color === "inherit")
		? "primary"
		: color];

	return ({
		borderRadius: "2em",
		border: variant === "contained" ? "none" : "1px solid",
		borderColor: `${paletteColor.main}7F`,
		backgroundColor: variant === "contained" ? paletteColor.main : "transparent",
		color: variant === "contained" ? paletteColor.contrastText : paletteColor.main,

		transition: theme.transitions.create(["border-color", "background-color"], {
			duration: theme.transitions.duration.short,
			easing: theme.transitions.easing.easeInOut,
		}),

		"&:hover": {
			borderColor: `${paletteColor.main}ff`,
			backgroundColor: variant === "contained" ? paletteColor.dark : `${paletteColor.main}10`,
		},
		height: "2em",
		width: "2em",
		aspectRatio: 1,
		lineHeight: 1,
	})
}) as ExtendButtonBase<IconButtonTypeMap<IconButtonProps>>;

export const MotionIconButton = motion(IconButton);
export default IconButton;
