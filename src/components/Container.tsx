import * as React from "react";

import MUIContainer from "@mui/material/Container"

export type ContainerProps = {
	children?: React.ReactNode;
}

export default function Container({ children }: ContainerProps){
	return <MUIContainer maxWidth="lg" sx={{ pt: 2 }}>
		{children}
	</MUIContainer>
}