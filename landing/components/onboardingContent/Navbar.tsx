import styled from 'styled-components';
import Image from "next/Image";

const Container=styled.nav`
  height: 48px;
  background-color: #fff8e6;
  display: flex;
  justify-content: center;
`

const ContentWrapper = styled.div`
  width: 70vw;
  display: flex;
  justify-content: space-between;
`

const ImageWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
  color?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "")};
  color: ${(props) => (props.color ? props.color : "")};
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
`

export default function Navbar() {
  return (
    <>
      <Container>
        <ContentWrapper>
          <ImageWrapper>
            <Image src={"/assets/img/logo.png"} alt="" width="24px" height="24px" />
            <Typography fs="2rem" fw="700">발자취</Typography>
          </ImageWrapper>
          <FlexContainer>
            <Typography fs="1.5rem" fw="700">DOWNLOAD</Typography>
            <Typography fs="1.5rem" fw="700">DOCS</Typography>
          </FlexContainer>
        </ContentWrapper>
      </Container>
    </>
  )
}