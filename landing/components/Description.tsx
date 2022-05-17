import styled from 'styled-components';
import Image from "next/Image";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  background-color: #ffffff;
`

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
  color?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "2rem")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "")};
  color: ${(props) => (props.color ? props.color : "")};
`;

const FlexContainer = styled.div`
  display: flex;

`
const ImageContainer = styled.div<{
  p?: string;
}>`
  display: flex;
  padding: ${(props) => (props.p ? props.p : "")};
`


const Description = () => {
  return (
    <Container>
      <Typography p="6rem 2rem 0 0">슬기로운 자취생활 길잡이</Typography> 
      <Typography fs="4rem" fw="600" color="#2E437A">발자취</Typography>
      <FlexContainer>
        <ImageContainer p="8rem 2rem 0 0">
        <Image src={"/assets/img/pawprints.png"} alt="" width="200px" height="100px" />
        </ImageContainer>
        <ImageContainer p="4rem 2rem">
          <Image src={"/assets/img/logo2.png"} alt="" width="100px" height="100px" />
        </ImageContainer>
        <ImageContainer  p="0 0 8rem 2rem">
        <Image src={"/assets/img/pawprints.png"} alt="" width="200px" height="100px" />
        </ImageContainer >
      </FlexContainer>
      <FlexContainer style={{paddingBottom: "5rem"}}>
        <Image src={"/assets/img/onboarding/512x512.png"} alt="" width="120px" height="120px" />
      </FlexContainer>
    </Container>
  );
};



export default Description;