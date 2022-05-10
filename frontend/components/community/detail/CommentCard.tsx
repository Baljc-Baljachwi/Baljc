import styled from "styled-components";
import Image from "next/image";

import Avatar from "../../../public/assets/img/mypage/avatar/avartar_h.jpg";
import ReplyCard from "./ReplyCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const ImageWrapper = styled.div`
  display: flex;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  overflow: hidden;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
`;

export default function CommentCard() {
  return (
    <Container>
      <ImageWrapper>
        <Image src={Avatar} alt="" width="100%" height="100%" />
      </ImageWrapper>
      <TextContainer>
        <FlexContainer>
          <Typography fs="1.6rem" fw="600">
            줌줌따리줌줌따리줌줌따리
          </Typography>
        </FlexContainer>
        <Typography fs="1.4rem" color="#3D3D3D">
          4분 전
        </Typography>
        <Typography fs="1.8rem">저 가능해요 ! 채팅 주세요 채팅 😁</Typography>
        <Typography fs="1.4rem" p="0 0 1rem 0">
          답글쓰기
        </Typography>
      </TextContainer>
      <div></div> {/* div tag 있어야 됩니당 grid때무네*/}
      <ReplyCard />
      <div></div> {/* div tag 있어야 됩니당 grid때무네*/}
      <ReplyCard />
    </Container>
  );
}
