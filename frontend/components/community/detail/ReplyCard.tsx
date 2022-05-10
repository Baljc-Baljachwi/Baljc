import styled from "styled-components";
import Image from "next/image";

import Avatar from "../../../public/assets/img/mypage/avatar/avartar_h.jpg";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding-top: 1rem;
  border-top: 1px solid #e8e8e8;
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
  margin-bottom: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
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

export default function ReplyCard() {
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
          {/* 작성자인 경우만 */}
          <Typography
            p="0.2rem 0.5rem"
            style={{
              backgroundColor: "#EDEDED",
              borderRadius: "4px",
              alignSelf: "center",
            }}
          >
            작성자
          </Typography>
        </FlexContainer>
        <Typography fs="1.4rem" color="#3D3D3D">
          4분 전
        </Typography>
        <Typography fs="1.8rem">저 가능해요 ! 채팅 주세요 채팅 😁</Typography>
      </TextContainer>
    </Container>
  );
}
