/* eslint-disable import/no-extraneous-dependencies */
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { LocalizationProvider } from "@mui/lab";
import type { EmotionCache } from "@emotion/utils";
import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "src/state/store";
import { SnackBarProvider, MainLayout } from "src";
import { GA_TRACKING_ID } from "src/lib/gtag";
import * as gtag from "src/lib/gtag";
import { useRouter } from "next/router";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "src/styles/global.css";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const isProduction = process.env.NODE_ENV === "production";

function MeetsyApp(
  props: AppProps & { emotionCache: EmotionCache | undefined }
): ReactNode {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL): void => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Meetsy</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {isProduction && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </>
        )}
      </Head>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <SessionProvider session={props.pageProps?.session}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <SnackBarProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </SnackBarProvider>
          </ThemeProvider>
        </SessionProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MeetsyApp);
