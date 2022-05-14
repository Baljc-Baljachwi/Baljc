import { NextPage } from "next";
import Head from "next/head";
// import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { RecoilRoot } from "recoil";

import { GlobalStyle } from "../styles/global-styles";
import "../styles/Calendar.css";
import { theme } from "../styles/theme";
config.autoAddCss = false;

import Layout from "../components/Layout";
import { AuthGuard } from "components/auth/AuthGuard";

import firebase from "firebase/app";
import "firebase/messaging";

import * as ga from "../lib/ga/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import NextNProgress from "nextjs-progressbar";
import HashLoader from "react-spinners/HashLoader";

const firebaseConfig = {
  apiKey: "AIzaSyAeqGoiBaRdhGeL7GstkELh1ntZBk_4ibo",
  authDomain: "baljc-145fa.firebaseapp.com",
  projectId: "baljc-145fa",
  storageBucket: "baljc-145fa.appspot.com",
  messagingSenderId: "258061494591",
  appId: "1:258061494591:web:f55a50774769fcc2db0b8a",
  measurementId: "G-25L7RC561S",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export default function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>발자취</title>
        </Head>
        <RecoilRoot>
          {pageLoading ? (
            <LayoutSpinner>
              <HashLoader color={"#EDB83C"} size={30} />
            </LayoutSpinner>
          ) : (
            <Layout>
              {Component.requireAuth ? (
                <AuthGuard>
                  <Component {...pageProps} />
                </AuthGuard>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          )}
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

const LayoutSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  opacity: 100;
`;

/* <NextNProgress
            color="#4338C9"
            startPosition={0.3}
            stopDelayMs={200}
            height={6}
            options={{ easing: "ease", speed: 500, showSpinner: false }}
          /> */
/* <NextNProgress
            color="#29D"
            showOnShallow={false}
            height={6}
            startPosition={0.3}
            options={{ easing: "ease", speed: 500, showSpinner: true }}
          /> */

/* <Layout>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout> */
