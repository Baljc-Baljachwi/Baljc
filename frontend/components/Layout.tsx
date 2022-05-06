import Navbar from "./navbar/index";
import styled from "styled-components";
import { useRouter } from "next/router";

const PageContent = styled.div<{ isLogin: boolean }>`
  padding-top: ${(props) => (props.isLogin ? "" : "6.6rem")};
  height: calc(100% - 5.6rem);
  overflow: ${(props) => (props.isLogin ? "" : "auto")};
`;

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <PageContent isLogin={router.pathname === "/"}>{children}</PageContent>
      {router.pathname === "/" ? <></> : <Navbar />}
    </>
  );
}
