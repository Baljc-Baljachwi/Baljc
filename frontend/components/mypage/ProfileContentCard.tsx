import styled from "styled-components";

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
  justify-content: space-between;
`;

const ProfileMenuCardTitle = styled.span`
  color: #33487f;
  font-weight: 700;
`;

const ProfileMenuCardDetail = styled.span`
  color: #696969;
  font-size: 1.2rem;
  font-weight: 400;
`;

interface ProfileContentProps {
  title: string;
  description: string;
}

const ProfileContentCard = ({ title, description }: ProfileContentProps) => {
  return (
    <>
      <ProfileMenuCardItem>
        <ProfileMenuCardContent>
          <ProfileMenuCardTitle>{title}</ProfileMenuCardTitle>
        </ProfileMenuCardContent>
        <ProfileMenuCardDetail>{description}</ProfileMenuCardDetail>
      </ProfileMenuCardItem>
    </>
  );
};

export default ProfileContentCard;
