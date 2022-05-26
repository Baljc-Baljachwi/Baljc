import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { userInfoState } from "atoms/atoms";
import { kakaoLogin } from "../../../api/member";
import { getToken } from "utils/FirebaseInit";

import Spinner from "components/common/Spinner";

export default function KakaoAuth() {
  const [_, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();
  const { code } = router.query;

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
        return currentToken;
      })
      .then((currentToken) => {
        kakaoLogin(code as string, currentToken).then((res) => {
          if (res.data.code === 1000) {
            const accessToken = res.headers.authorization;
            const refreshToken = res.headers.refreshtoken;
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
      .catch((err) => console.log(err));
  }, [code, router, setUserInfo]);

  return (
    <Spinner
      color="#cdcdcd"
      size="30px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    />
  );
}
