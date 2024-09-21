import * as React from "react"

import { SxProps, useTheme } from "@mui/material/styles"
import { Box } from "@mui/material";

export type IsaxIconProps = {
	name: string,
	sx?: SxProps
}

export default function IsaxIcon(props: IsaxIconProps){
	const { 
		name,
		sx
	} = props;
	const theme = useTheme();
	return <Box component="i" className={`isax ${name}`}
		sx={[
			{ color: theme.palette.primary.main },
			...sx instanceof Array ? sx : [sx]
		]}
	/>
}
