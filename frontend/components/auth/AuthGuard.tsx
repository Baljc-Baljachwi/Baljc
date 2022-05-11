import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();
  useEffect(() => {
    if (!userInfo || !userInfo.accessToken) {
      router.push("/");
    } else if (!userInfo.surveyedYn) {
      router.push("/auth/survey");
    }
  }, [userInfo, router]);

  if (userInfo) {
    return <>{children}</>;
  }

  return null;
}
