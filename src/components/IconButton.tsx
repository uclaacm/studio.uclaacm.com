import { styled } from "@mui/material/styles"
import MUIIconButton, { IconButtonProps as MUIIconButtonProps } from "@mui/material/IconButton"
import { ButtonBaseProps, ButtonProps, ExtendButtonBase, ExtendButtonBaseTypeMap, PaletteColor } from "@mui/material"
import { motion, MotionProps } from "framer-motion"
import { OverridableComponent, OverridableTypeMap, OverrideProps } from "@mui/material/OverridableComponent"
import React from "react"
import { useTheme } from "@mui/material"


export type IconButtonProps =
	{
		variant?: Exclude<ButtonProps["variant"], "text">,
		paletteColor?: PaletteColor,
		component?: React.ElementType,
	} & Omit<MUIIconButtonProps, "ref">;

const IconButton = React.forwardRef<any, IconButtonProps>(function IconButton(props: IconButtonProps, ref){
	const theme = useTheme();

	console.log(theme.transitions.duration.short);

	let {
		variant = "outlined",
		component = "href" in props ? "a" : "button",
		paletteColor,
		sx,
		...muiIconButtonProps
	} = props;

	const color = props.color;
	const colorVariant =
		(color === undefined || color === "inherit" || color === "default")
			? "primary"
			: color;

	paletteColor ??= theme.palette[colorVariant];

	return <MUIIconButton
		ref={ref}
		sx={[
			{
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
				}
			},
			...sx instanceof Array ? sx : [sx ?? {}]
		]}
		{...muiIconButtonProps}
	/>
})

export const MotionIconButton = motion(IconButton);
export default IconButton;