import styled from "styled-components";
import { useRouter } from "next/router";

import Header from "components/common/Header";
import ProfileCard from "components/mypage/ProfileCard";
import ProfileContentList from "components/mypage/ProfileContentList";
import { useState, useEffect } from "react";

const Container = styled.div`
  /* height: 100vh; */
`;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;

  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

const ProfileContentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin-top: 2rem;
  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2rem;
`;

const MyPage = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <div>
      <Container>
        <Header
          label="마이페이지"
          icon="pencil"
          onClickRightButton={() => router.push("/mypage/modify")}
        ></Header>
        <PageContainer>
          <ProfileCardContainer>
            <ProfileCard />
          </ProfileCardContainer>
          <ProfileContentListContainer>
            <ProfileContentList />
          </ProfileContentListContainer>
        </PageContainer>
      </Container>
    </div>
  );
};

export default MyPage;

MyPage.requireAuth = true;
