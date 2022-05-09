import Navbar from "./navbar/index";
import styled from "styled-components";
import { useRouter } from "next/router";

const PageContent = styled.div<{ isLogin: boolean; isNoNav?: boolean }>`
  padding-top: ${(props) => (props.isLogin ? "" : "6.6rem")};
  height: ${(props) => (props.isNoNav ? "calc(100% )" : "calc(100% - 5.6rem)")};
  overflow: ${(props) => (props.isLogin ? "" : "auto")};
  background: ${(props) => (props.isLogin ? "" : "#ffffff")};
`;

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  const router = useRouter();

  return (
    <>
      <PageContent
        isLogin={
          router.pathname === "/" ||
          router.pathname === "/auth/kakao/[...params]" ||
          router.pathname === "/mypage/survey"
        }
        isNoNav={router.pathname === "/community/chat/[...params]"}
      >
        {children}
      </PageContent>
      {router.pathname === "/" ||
      router.pathname === "/auth/kakao/[...params]" ||
      router.pathname === "/mypage/survey" ||
      router.pathname === "/community/chat/[...params]" ? (
        <></>
      ) : (
        <Navbar />
      )}
    </>
  );
}
