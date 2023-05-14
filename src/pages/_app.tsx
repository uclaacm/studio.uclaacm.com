import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/theme";

import { AppProps } from "next/app";

import "~/stylesheets/main.scss"

export default function App({Component, pageProps}: AppProps){
	return <>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Component {...pageProps}/>
		</ThemeProvider>
	</>
}