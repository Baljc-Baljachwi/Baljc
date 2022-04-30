import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";

const Home: NextPage = () => {
  return (
    <>
      <KakaoLoginButton></KakaoLoginButton>
    </>
  );
};

export default Home;
