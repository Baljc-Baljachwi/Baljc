import styled from "styled-components";

import Image from "next/image";

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
  align-items: center;
  background: #2e437a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 40px 40px;
  height: 30vh;
  color: #ffffff;
`;

const ProfileImage = styled.div`
  border: 3px solid #fafafe;
  /* box-sizing: border-box; */
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  /* border-radius: 4rem; */
  /* background-image: ; */
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  position: relative;
  .profileImg {
    border-radius: 50%;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 900;
  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: #ffd469;
  }
`;

interface ProfileCardProps {
  //   isFixed: boolean;
  //   isExpenditure: boolean;
  //   title: string;
  //   price: string;
  //   method: string;
  //   category: string;
  // price: number;
  //   fixed_expenditure_yn: boolean;
  //   fixed_income_yn: boolean;
  //   inExpenditure: boolean;
}

const ProfileCard = ({}: ProfileCardProps) => {
  return (
    <div>
      <Container>
        <ProfileCardContainer>
          <ProfileImage>
            <Image
              className="profileImg"
              src="/assets/img/mypage/avatar_member6.png"
              alt="avatar"
              layout="fill"
            />
          </ProfileImage>
          <ProfileInfo>
            발챙쓰
            <span style={{ color: "#ffffff" }}>
              목표 | 조금 좋은 집을 살 거예요
            </span>
            <span>급여 | 비밀</span>
            <span>한 달 예산 | 500,000 원</span>
          </ProfileInfo>
        </ProfileCardContainer>
        {/* <PageContainer>하이sdfsdfdf</PageContainer> */}
      </Container>
    </div>
  );
};

export default ProfileCard;
