import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/theme";

import { AppPropsWithLayout } from "~/@types";

import { Auth0Provider } from '@auth0/auth0-react';

import "~/stylesheets/main.scss"

import Layout from "~/components/Layout";

export default function App({Component, pageProps}: AppPropsWithLayout){
	// optional layout function
	const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

	return <>
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			{getLayout(<Component {...pageProps}/>)}
		</ThemeProvider>
	</>
}