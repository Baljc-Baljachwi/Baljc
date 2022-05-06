import Navbar from "./navbar/index";
import styled from "styled-components";

const PageContent = styled.div`
  padding-top: 6.6rem;
  height: calc(100% - 5.6rem);
  overflow: auto;
  background-color: #ffffff;
`;

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <PageContent>{children}</PageContent>
      <Navbar />
    </>
  );
}
