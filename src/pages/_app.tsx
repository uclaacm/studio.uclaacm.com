import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/theme";

import { AppPropsWithLayout } from "~/@types";

import "~/stylesheets/main.scss"

import Layout from "~/components/Layout";
import { InputProvider } from "~/components/Input";

export default function App({Component, pageProps}: AppPropsWithLayout){
	// optional layout function
	const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

	return <>
		<ThemeProvider theme={theme}>
			<InputProvider>
				<CssBaseline/>
				{getLayout(<Component {...pageProps}/>)}
			</InputProvider>
		</ThemeProvider>
	</>
}