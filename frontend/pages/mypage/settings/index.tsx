import styled from "styled-components";
import Header from "components/common/Header";
import ProfileCard from "components/mypage/ProfileCard";
import ProfileSettingsList from "components/mypage/settings/ProfileSettingsList";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
  height: 100vh;
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
  /* padding: 0 2rem; */
`;
const PageTitle = styled.span`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 2rem 0;
  color: #33487f;
`;
const ProfileContentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* appearance: none; */
  border: none;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  /* filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25)); */

  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2rem;
`;

const Settings = () => {
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
            {/* <PageTitle>설정</PageTitle> */}
            <ProfileSettingsList />
          </ProfileContentListContainer>
        </PageContainer>
      </Container>
    </div>
  );
};

export default Settings;
