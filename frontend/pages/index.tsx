import type { NextPage } from "next";

import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { newUserState, userInfoState } from "atoms/atoms";
import LocalStorage from "utils/localStorage";

const Home: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [newUser, setNewUser] = useRecoilState(newUserState);

  useEffect(() => {
    // 처음 온 유저인지 확인
    // const isNew = JSON.parse(localStorage.getItem("isNew") || "true");
    // setIsNewUser(isNew);
    // if (isNew) {
    //   router.push("/onboarding");
    //   return;
    // }

    // 임시로 접속하면 항상 온보딩 뜨도록
    if (newUser) {
      router.push("/onboarding");
      return;
    }

    if (userInfo.accessToken) {
      if (userInfo.surveyedYn) {
        router.push("/calendar");
      } else {
        router.push("/auth/survey");
      }
    }
  }, [router, userInfo, newUser]);
  // 온보딩 가기 전에 로그인 화면 보이지 않게
  return <>{newUser ? null : <KakaoLoginButton></KakaoLoginButton>}</>;
};

export default Home;
