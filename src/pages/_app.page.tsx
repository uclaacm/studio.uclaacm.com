import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/theme";

import { AppPropsWithLayout } from "~/@types";

import "~/stylesheets/main.css";
import "~/stylesheets/iconsax.css";
import "~/stylesheets/highlight.css";

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import Layout from "~/components/Layout";
import { InputProvider } from "~/components/Input";
import Head from "next/head";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // optional layout function
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="acm.studio" />
        <meta name="application-name" content="acm.studio" />
        <meta name="msapplication-TileColor" content="#ff8c93" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <InputProvider>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </InputProvider>
      </ThemeProvider>
    </>
  );
}
