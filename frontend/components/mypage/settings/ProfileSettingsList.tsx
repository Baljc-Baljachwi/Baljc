import styled from "styled-components";
import ProfileContentCard from "../ProfileContentCard";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
`;
const ProfileSettingsList = () => {
  return (
    <>
      <PageContainer>
        <ProfileContentCard
          title="푸쉬 알림 설정"
          description="푸쉬 알림을 받습니다."
        />
        <ProfileContentCard title="문의하기" description="1:1 문의를 합니다." />
        <ProfileContentCard title="탈퇴하기" description="안녀엉..." />
      </PageContainer>
    </>
  );
};

export default ProfileSettingsList;
