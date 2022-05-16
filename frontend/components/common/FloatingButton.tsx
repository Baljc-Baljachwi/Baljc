import styled from "styled-components";
import Icon from "./Icon";

const Container = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 7rem;
  z-index: 1000;
  background-color: #ffffff;
  border-radius: 50rem;
  box-shadow: 0 2px 5px rgba(123, 123, 123, 0.482);
`;

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function FloatingButton({ onClick }: ButtonProps) {
  return (
    <Container onClick={onClick}>
      <Icon mode="fas" icon="circle-plus" size="60px" color="#FFD469" />
    </Container>
  );
}
