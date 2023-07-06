import * as React from "react";
import { AppProps } from "next/app";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../material-ui/theme";
import createEmotionCache from "../material-ui/createEmotionCache";

import { Layout } from "@components/Common/Layout";

import "@styles/globals.scss";
import { TournamentsDataProvider } from "../context/TournamentsData";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <TournamentsDataProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </TournamentsDataProvider>
    </CacheProvider>
  );
}
