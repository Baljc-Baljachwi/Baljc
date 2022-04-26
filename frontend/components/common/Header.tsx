import styled from "styled-components";
import Icon from "./Icon";

const StyledHeader = styled.header`
  width: 100%;
  height: 6.6rem;
  background-color: #2e437a;
  font-size: 2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const BackButton = styled.span`
  padding-right: 1rem;
  cursor: pointer;
`;

interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <StyledHeader>
      <BackButton>
        <Icon mode="fas" icon="chevron-left" color="#ffffff" size="16px" />
      </BackButton>
      {label}
    </StyledHeader>
  );
}
