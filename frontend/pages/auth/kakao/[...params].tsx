import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { accessTokenState } from "atoms/atoms";
import { kakaoLogin } from "../../../api/member";

export default function KakaoAuth() {
  const [_, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const { code } = router.query;
  useEffect(() => {
    if (!code) return;
    kakaoLogin(code as string).then((res) => {
      console.log(res.data);
      if (res.data.code === 1000) {
        const accessToken = res.headers.authorization;
        console.log(`accessToken : ${accessToken}`);
        setAccessToken(accessToken);
        console.log(res.data.data);

        router.push(res.data.data.surveyedYn ? "/calendar" : "/mypage/survey");
      }
    });
  }, [code, router, setAccessToken]);
  return null;
}
