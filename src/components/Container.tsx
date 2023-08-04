import * as React from "react";

import MUIContainer from "@mui/material/Container"
import Box from "@mui/material/Box"

export type ContainerProps = {
	children?: React.ReactNode;
	background?: React.ReactNode,
}

export default function Container({ children, background }: ContainerProps){
	return background ? (
		<Box sx={{
			width: "100%",
			height: "100%",
			display: "grid",
			gridTemplate: "1fr / 1fr",
		}}>
			<Box sx={{ gridArea: "1 / 1 / 1 / 1" }}>{background}</Box>
			<Box sx={{ gridArea: "1 / 1 / 1 / 1" }}>
				<MUIContainer maxWidth="lg" sx={{ pt: 2 }}>
					{children}
				</MUIContainer>
			</Box>
		</Box>
	) : (
		<MUIContainer maxWidth="lg" sx={{ pt: 2 }}>
			{children}
		</MUIContainer>
	)
}