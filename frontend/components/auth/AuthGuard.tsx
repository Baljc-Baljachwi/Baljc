import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "atoms/atoms";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const accessToken = useRecoilValue(accessTokenState);
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  if (accessToken) {
    return <>{children}</>;
  }

  return null;
}
