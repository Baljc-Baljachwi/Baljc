import styled from "styled-components";
import Header from "components/common/Header";
import ProfileContentCard from "components/mypage/ProfileContentCard";

const Container = styled.div`
  height: 100vh;
`;
const PageContainer = styled.main`
  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* width: 100%; */
  padding: 1.6rem 2rem;
`;
const PageTitle = styled.span`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 2rem 0;
  color: #33487f;
`;
const DivisionLine = styled.hr`
  border-top: 2px solid lightgray;
`;
const ProfileContentListContainer = styled.div`
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f4f4f4;
  border: none;
  border-radius: 1rem;
  width: 100%;
  height: 100%;

  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2rem;
`;
//-----------------------------------------------------------------------------------
const ProfileMenuCardItem = styled.div`
  /* width: 32rem; */
  /* margin-left: 2rem; */
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f4f4f4;

  width: 100%;
  /* width: 32rem; */
  height: 9rem;
  /* width: 320px; */
  /* height: 90px; */

  font-size: 1.6rem;
  padding: 1.6rem 2rem;

  font-family: "Noto Sans KR", sans-serif;
  color: #747373;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

const ProfileMenuCardContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
`;

const ProfileMenuCardTitle = styled.span`
  color: #33487f;
  font-weight: 700;
  font-size: 1.6rem;
`;

const ProfileMenuCardDetail = styled.span`
  color: #696969;
  font-size: 1rem;
  font-weight: 400;
`;

const SettingAlarmItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const SettingAlarmItem = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  span {
    color: #3d3d3d;
  }
`;

interface ProfileMenuContentProps {
  title: string;
  description: string;
}
const alarm = ({ title, description }: ProfileMenuContentProps) => {
  return (
    <>
      <Container>
        <Header label="알림 설정"></Header>
        <PageContainer>
          <ProfileContentListContainer>
            <ProfileMenuCardContent>
              <ProfileMenuCardTitle>푸쉬 알림 설정</ProfileMenuCardTitle>
              <ProfileMenuCardDetail>
                푸쉬 알림을 받습니다.
              </ProfileMenuCardDetail>
            </ProfileMenuCardContent>
            <DivisionLine />
            <SettingAlarmItemList>
              <SettingAlarmItem>
                <span>가계부</span>
                <span>오후 9:00</span>
              </SettingAlarmItem>
              <SettingAlarmItem>
                <span>할 일</span>
                <span>오전 9:00</span>
              </SettingAlarmItem>
            </SettingAlarmItemList>
            {/* <ProfileContentCard
              title="푸쉬 알림 설정"
              description="푸쉬 알림을 받습니다."
            /> */}
            {/* <ProfileSettingsList /> */}
          </ProfileContentListContainer>
        </PageContainer>
      </Container>
    </>
  );
};

export default alarm;
