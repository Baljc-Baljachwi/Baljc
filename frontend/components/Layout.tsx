import Navbar from "./navbar/index";
import styled from "styled-components";

const PageContent = styled.div`
  padding-bottom: 7rem;
`;

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <PageContent>{children}</PageContent>
      <Navbar />
    </>
  );
}
