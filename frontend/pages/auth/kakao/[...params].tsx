import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { userInfoState } from "atoms/atoms";
import { kakaoLogin } from "../../../api/member";
import { getToken } from "utils/FirebaseInit";

import Spinner from "components/common/Spinner";

export default function KakaoAuth() {
  const [_, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();
  const { code } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  const firebaseMessageToken = async () => {
    try {
      let token = await getToken();
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    if (!code) return;

    firebaseMessageToken()
      .then((currentToken) => {
        // console.log("FCM token: ", currentToken);
        return currentToken;
      })
      .then((currentToken) => {
        kakaoLogin(code as string, currentToken).then((res) => {
          if (res.data.code === 1000) {
            console.log(res);
            console.log(res.headers);
            console.log(res.headers.refreshtoken);
            const accessToken = res.headers.authorization;
            const refreshToken = res.headers.refreshtoken;
            console.log(`accessToken : ${accessToken}`);
            console.log(`refreshToken : ${refreshToken}`);
            // console.log(res.data.data);

            const { memberId, surveyedYn, regionYn } = res.data.data;

            setUserInfo({
              accessToken,
              refreshToken,
              memberId,
              surveyedYn,
              regionYn,
            });

            router.push(
              res.data.data.surveyedYn ? "/calendar" : "/auth/survey"
            );
          }
        });
      })
      .catch((err) => console.error(err));
  }, [code, router, setUserInfo]);

  return (
    <Spinner
      color="#cdcdcd"
      size="30"
      display="flex"
      justifyContent="center"
      alignItems="center"
    />
  );
}
