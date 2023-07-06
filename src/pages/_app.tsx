import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { AppProps } from "next/app";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../material-ui/theme";
import createEmotionCache from "../material-ui/createEmotionCache";

import { TournamentsDataProvider } from "../context/TournamentsData";

import { Layout } from "@components/Common/Layout";
import { Loader } from "@components/Common/Loader";

import "@styles/globals.scss";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;
  const [loading, setLoading] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const handleStartRouteChanging = () => setLoading(true);
    const handleCompleteRouteChanging = () => setLoading(false);

    router.events.on("routeChangeStart", handleStartRouteChanging);
    router.events.on("routeChangeComplete", handleCompleteRouteChanging);

    return () => {
      router.events.off("routeChangeStart", handleStartRouteChanging);
      router.events.off("routeChangeComplete", handleCompleteRouteChanging);
    };
  }, []);
  return (
    <TournamentsDataProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={router.pathname}
              classNames='pageTransition'
              timeout={300}
              nodeRef={nodeRef}
            >
              <Layout ref={nodeRef}>
                <Component {...pageProps} />
              </Layout>
            </CSSTransition>
          </SwitchTransition>

          <Loader loading={loading} />
        </ThemeProvider>
      </CacheProvider>
    </TournamentsDataProvider>
  );
}
