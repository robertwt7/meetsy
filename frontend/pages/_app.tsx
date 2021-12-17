/* eslint-disable import/no-extraneous-dependencies */
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { LocalizationProvider } from "@mui/lab";
import type { EmotionCache } from "@emotion/utils";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "tailwindcss/tailwind.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(
  props: AppProps & { emotionCache: EmotionCache | undefined }
): ReactNode {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Meetsy</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <SessionProvider session={props.pageProps?.session}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}
