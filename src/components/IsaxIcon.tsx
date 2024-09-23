import * as React from "react"

import { SxProps, useTheme } from "@mui/material/styles"
import { Box, ButtonProps } from "@mui/material";

export type IsaxIconProps = {
	name: string,
	color?: ButtonProps["color"]
	sx?: SxProps
}

export default function IsaxIcon(props: IsaxIconProps){
	const { 
		name,
		color = "primary",
		sx
	} = props;

	const theme = useTheme();

	const colorValue = color in theme.palette
		? theme.palette[color].main
		: color;

	return <Box component="i" className={`isax ${name}`}
		sx={[
			{ color: colorValue },
			...sx instanceof Array ? sx : [sx]
		]}
	/>
}
