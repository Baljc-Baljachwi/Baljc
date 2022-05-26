import { NextPage } from "next";
import Head from "next/head";
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
          <meta name="description" content="슬기로운 자취생활 길잡이, 발자취" />
          <meta
            name="keywords"
            content="자취생활, 자취길잡이, 자취하는방법, 자취처음, 발자취, 자취생"
          />
          <title>발자취</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="apple-mobile-web-app-title" content="발자취" />
          <meta name="application-name" content="발자취" />
          <meta name="description" content="슬기로운 자취생활 길잡이" />
          <meta property="og:image" content="icons/192x192.png"></meta>
          <link rel="manifest" href="/manifest.json" />
          <link rel="assetlinks" href="/.well-known/assetlinks.json" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <RecoilRoot>
          {pageLoading ? (
            <LayoutSpinner>
              <HashLoader color={"#cdcdcd"} size="30px" />
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
