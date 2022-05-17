import styled from "styled-components";
import { useRouter } from "next/router";

import Navbar from "components/onboardingContent/Navbar";

const PageContent = styled.div<{ isLogin: boolean; isNoNav?: boolean }>`
  height: 100vh;
  overflow: ${(props) => (props.isLogin ? "" : "auto")};
  background: ${(props) => (props.isLogin ? "" : "#ffffff")};
`;

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  const router = useRouter();

  return (
    <>
      <Navbar/>
      <PageContent>{children}</PageContent>
    </>
  );
}
