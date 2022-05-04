import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "states";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const accessToken = useRecoilValue(accessTokenState);
  const router = useRouter();
  useEffect(() => {
    if (!accessToken || !accessToken.accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  if (accessToken?.accessToken) {
    return <>{children}</>;
  }

  return null;
}
