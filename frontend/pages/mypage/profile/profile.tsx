import styled from "styled-components";
import Header from "../../../components/common/Header";
import ProfileCard from "components/mypage/ProfileCard";

const Container = styled.div`
  height: 100vh;
`;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  /* padding: 0 2rem; */
  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
`;

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #2e437a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 40px 40px;
  height: 30vh;
  color: #ffffff;
`;

const profile = () => {
  return (
    <div>
      <Container>
        <Header label="마이페이지" icon="pencil"></Header>
        <ProfileCard />
      </Container>
    </div>
  );
};

export default profile;
