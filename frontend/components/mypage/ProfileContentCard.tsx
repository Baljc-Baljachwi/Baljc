import styled from "styled-components";
import { useRouter } from "next/router";

const ProfileMenuCardItem = styled.div<{ height?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f4f4f4;
  width: 100%;
  height: ${(props) => (props.height ? props.height : "9rem")};
  font-size: 1.8rem;
  padding: 1.6rem 2rem;
  font-family: "Noto Sans KR", sans-serif;
  color: #747373;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
`;

const ProfileMenuCardContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileMenuCardTitle = styled.span<{ color?: string }>`
  // color: #33487f;
  color: ${(props) => (props.color ? props.color : "#33487f")};
  font-weight: 700;
`;

const ProfileMenuCardDetail = styled.span`
  color: #4d5158;
  font-size: 1.4rem;
  font-weight: 400;
`;

interface ProfileContentProps {
  title: string;
  height?: string;
  description?: string;
  onClick?: () => void;
  color?: string;
}

const ProfileContentCard = ({
  title,
  height,
  description,
  onClick,
  color,
}: ProfileContentProps) => {
  const router = useRouter();

  return (
    <>
      <ProfileMenuCardItem height={height} onClick={onClick}>
        <ProfileMenuCardContent>
          <ProfileMenuCardTitle color={color}>{title}</ProfileMenuCardTitle>
        </ProfileMenuCardContent>
        <ProfileMenuCardDetail>{description}</ProfileMenuCardDetail>
      </ProfileMenuCardItem>
    </>
  );
};

export default ProfileContentCard;
