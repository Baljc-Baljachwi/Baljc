import styled from "styled-components";
import Icon from "./Icon";

const Container = styled.div`
  width: 100%;
  max-width: 512px;
  position: fixed;
  bottom: 13rem;
  z-index: 1000;
`;

const ChatDiv = styled.div`
  position: absolute;
  right: 2rem;
  margin: 0 1rem;
  cursor: pointer;
  border: 1px solid #ffd469;
  border-radius: 50rem;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(123, 123, 123, 0.482);
`;

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function FloatingButton({ onClick }: ButtonProps) {
  return (
    <Container onClick={onClick}>
      <ChatDiv>
        <Icon mode="fas" icon="circle-plus" size="60px" color="#FFD469" />
      </ChatDiv>
    </Container>
  );
}
