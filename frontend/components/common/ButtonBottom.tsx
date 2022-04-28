import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  background-color: #2e437a;
  color: #ffffff;
  font-size: 1.6rem;
  padding: 1.6rem 0;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

interface ButtonBottomProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonBottom({ label, onClick }: ButtonBottomProps) {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}
