import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "atoms/atoms";

const Home: NextPage = () => {
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenState);

  useEffect(() => {
    if (accessToken) {
      router.push("/calendar");
    }
  }, [router, accessToken]);
  return (
    <>
      <KakaoLoginButton></KakaoLoginButton>
    </>
  );
};

export default Home;
