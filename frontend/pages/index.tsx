import type { NextPage } from "next";

import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";
import LocalStorage from "utils/localStorage";

const Home: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  useEffect(() => {
    // 처음 온 유저인지 확인
    const isNew = JSON.parse(localStorage.getItem("isNew") || "true");
    setIsNewUser(isNew);
    if (isNew) {
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
  }, [router, userInfo]);
  // 온보딩 가기 전에 로그인 화면 보이지 않게
  return <>{isNewUser ? null : <KakaoLoginButton></KakaoLoginButton>}</>;
};

export default Home;
