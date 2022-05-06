import Navbar from "./navbar/index";
import styled from "styled-components";
import { useRouter } from "next/router";

const PageContent = styled.div<{ isLogin: boolean }>`
  padding-top: ${(props) => (props.isLogin ? "" : "6.6rem")};
  height: calc(100% - 5.6rem);
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
          router.pathname === "/auth/kakao/[...params]"
        }
      >
        {children}
      </PageContent>
      {router.pathname === "/" ||
      router.pathname === "/auth/kakao/[...params]" ? (
        <></>
      ) : (
        <Navbar />
      )}
    </>
  );
}
