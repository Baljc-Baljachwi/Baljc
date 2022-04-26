import styled from "styled-components";

const Component = styled.div`
  background-color: #2e437a;
  height: 100vh;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 8.4rem;
`;

const FootImg = styled.img`
  width: 2.5rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    writing-mode: vertical-rl;
  }
  margin: 1rem 0px;
`;

export default function Landing() {
  return (
    <Component>
      <LogoImg src="/assets/img/logo.png" alt="logo"></LogoImg>
      <Div>
        <h1>발자취</h1>
      </Div>
      <FootImg src="/assets/img/foot.png" alt="logo" />
    </Component>
  );
}
