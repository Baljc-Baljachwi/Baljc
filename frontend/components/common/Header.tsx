import styled from "styled-components";
import { IconName } from "@fortawesome/free-solid-svg-icons";

import Icon from "./Icon";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  width: 100%;
  height: 6.6rem;
  background-color: #2e437a;
  font-size: 2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`;

const BackButton = styled.span`
  padding-right: 1rem;
  cursor: pointer;
`;

const AddorModifyButton = styled.span`
  /* padding-right: 2rem; */
  cursor: pointer;
`;

interface HeaderProps {
  label: string;
  icon?: IconName;
  onClickRightButton?: () => void;
}

export default function Header({
  label,
  icon,
  onClickRightButton,
}: HeaderProps) {
  const router = useRouter();
  function onClickBackButton() {
    router.back();
  }

  return (
    <StyledHeader>
      <div>
        <BackButton onClick={onClickBackButton}>
          <Icon mode="fas" icon="chevron-left" color="#ffffff" size="16px" />
        </BackButton>
        {label}
      </div>
      {icon && (
        <AddorModifyButton onClick={onClickRightButton}>
          <Icon mode="fas" icon={icon} color="#ffffff" size="16px" />
        </AddorModifyButton>
      )}
    </StyledHeader>
  );
}
