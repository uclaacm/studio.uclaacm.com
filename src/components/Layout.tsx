import * as React from "react";

import Box from "@mui/material/Box";

export type LayoutProps = {
	children: React.ReactElement,
}

export default function Layout({children}: LayoutProps){
	return <Box>{children}</Box>
}