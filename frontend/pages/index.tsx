import type { NextPage } from "next";

import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";

const Home: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    if (userInfo.accessToken) {
      if (userInfo.surveyedYn) {
        router.push("/calendar");
      } else {
        router.push("/auth/survey");
      }
    }
  }, [router, userInfo]);
  return (
    <>
      <KakaoLoginButton></KakaoLoginButton>
    </>
  );
};

export default Home;
