import { useRouter } from "next/router";
import { useEffect } from "react";
import { kakaoLogin } from "../../../api/member";

export default function KakaoAuth() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;
    kakaoLogin(code as string).then((res) => {
      console.log(res.data);
      if (res.data.code === 1000) {
        console.log(res.data.data.accessToken);
      }
    });
  }, [code]);
  console.log(code);
  return <div>Login...</div>;
}
