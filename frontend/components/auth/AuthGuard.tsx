import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname.split("/")[1]);
    if (!userInfo || !userInfo.accessToken) {
      router.push("/");
    } else if (!userInfo.surveyedYn) {
      router.push("/auth/survey");
    } else if (
      router.pathname.split("/")[1] === "community" &&
      !userInfo.regionYn
    ) {
      confirm(
        "커뮤니티 이용을 위해서는 위치 정보가 필요합니다!\n마이페이지에서 위치 정보를 수정해주세요. "
      );
      router.back();
    }
  }, [userInfo, router]);

  if (userInfo) {
    return <>{children}</>;
  }

  return null;
}
