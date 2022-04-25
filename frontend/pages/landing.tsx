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

const Img = styled.img`
  width: 84px;
  height: 75px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    writing-mode: vertical-rl;
  }
  margin: 10px 0px;
`;

export default function Landing() {
  return (
    <Component>
      <Img src="/assets/img/logo.png" alt="logo"></Img>
      <Div>
        <h1>발자취</h1>
      </Div>
      <img src="/assets/img/foot.png" alt="logo" width={25} height={27} />
    </Component>
  );
}
