import * as React from "react"

import { useTheme } from "@mui/material/styles"

export type IsaxIconProps = {
	name: string
}

export default function IsaxIcon({ name }: IsaxIconProps){
	const theme = useTheme();
	return <i className={`isax ${name}`} style={{ color: theme.palette.primary.main }}></i>
}