import { Layouts as S } from "./layouts";
import styled, { css } from "styled-components";
// import LoginModalButton from 'components/Main/LoginModalButton';
import Fade from "react-reveal/Fade";
import withReveal from "react-reveal/withReveal";
import Iosimgrc1 from "public/assets/img/onboarding/Iosimgrc1.png";
import Iosimgrc2 from "public/assets/img/onboarding/Iosimgrc2.png";
import Iosimgrc3 from "public/assets/img/onboarding/Iosimgrc3.png";

import Androidimgrc1 from "public/assets/img/onboarding/Androidimgrc1.png";
import Androidimgrc2 from "public/assets/img/onboarding/Androidimgrc2.png";
import Androidimgrc3 from "public/assets/img/onboarding/Androidimgrc3.png";

import { useCallback, useState } from "react";

const Onboarding3 = () => {
  const [selectedOS, setSelectedOS] = useState<"iOS" | "android">("iOS");

  // const onClickButton = useCallback(
  //   (e) => {
  //     setSelectedOS(e.target.dataset.id);
  //   },
  //   [selectedOS]
  // );
  const onClickButton = useCallback(
    (e: any) => {
      setSelectedOS(e.target.dataset.id);
    },
    [selectedOS]
  );

  return (
    <S.Wrapper backgroundColor="linear-gradient(180deg, #FFD469 50%, #F8F9FA 50%)">
      <Container>
        <ContentWrapper>
          <S.Content>
            <p>
              <em>발자취</em> 를 <b>IOS에서도</b>
            </p>
            <p>편리하게 즐길 수 있어요!</p>
          </S.Content>
          <ButtonWrapper onClick={onClickButton}>
            <Button data-id="android" isSelected={selectedOS === "android"}>
              Android
            </Button>
            <Button data-id="iOS" isSelected={selectedOS === "iOS"}>
              iOS
            </Button>
          </ButtonWrapper>
        </ContentWrapper>

        {selectedOS === "android" ? (
          <AndroidImageContainer>
            <ImageWrapper>
              <Caption>1. Chrome 앱 실행</Caption>
              <Image
                src={"/assets/img/onboarding/Androidimgrc1.png"}
                alt="android 앱 설치 방법 이미지 1"
              />
            </ImageWrapper>
            <ImageWrapper>
              <Caption>2. 설치 배너 클릭</Caption>
              <Image
                src={"/assets/img/onboarding/Androidimgrc2.png"}
                alt="android 앱 설치 방법 이미지 2"
              />
            </ImageWrapper>
            <ImageWrapper>
              <Caption>3. 설치 버튼 클릭</Caption>
              <Image
                src={"/assets/img/onboarding/Androidimgrc3.png"}
                alt="android 앱 설치 방법 이미지 3"
              />
            </ImageWrapper>
          </AndroidImageContainer>
        ) : (
          <IOSImageContainer>
            <ImageWrapper>
              <Caption>1. 하단 공유버튼 클릭</Caption>
              <Image
                src={"/assets/img/onboarding/Iosimgrc1.png"}
                alt="iOS 앱 설치 방법 이미지 1"
              />
            </ImageWrapper>
            <ImageWrapper>
              <Caption>2. "홈 화면에 추가" 클릭</Caption>
              <Image
                src={"/assets/img/onboarding/Iosimgrc2.png"}
                alt="iOS 앱 설치 방법 이미지 2"
              />
            </ImageWrapper>
            <ImageWrapper>
              <Caption>3. 추가 버튼 클릭</Caption>
              <Image
                src={"/assets/img/onboarding/Iosimgrc3.png"}
                alt="iOS 앱 설치 방법 이미지 3"
              />
            </ImageWrapper>
          </IOSImageContainer>
        )}
        {/* <LoginModalButton /> */}
      </Container>
    </S.Wrapper>
  );
};

const Container = styled(S.Container)`
  flex-direction: column;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
    flex-direction: column;
    gap: 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ isSelected: boolean }>`
  font-weight: 700;
  font-size: clamp(1rem, 1.2vw, 1.4rem);
  border-radius: 100px;
  width: 120px;
  padding: 6px 12px;
  flex: none;

  ${({ isSelected, theme }) =>
    isSelected
      ? css`
          background-color: ${theme.color.main};
          border: 1px solid ${theme.color.main};
          color: white;
        `
      : css`
          background-color: transparent;
          border: 1px solid ${theme.color.main};
          color: ${theme.color.main};
        `}
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding: 0 10%;
  gap: 20px;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${({ theme }) => theme.size.mobile} {
    padding: 0 0 0 10%;
  }
`;

const AndroidImageContainer = styled(ImageContainer)``;
const IOSImageContainer = styled(ImageContainer)``;

const ImageWrapper = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Caption = styled.figcaption`
  color: ${({ theme }) => theme.color.main};

  font-weight: 500;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  text-align: center;
  letter-spacing: -0.05em;
`;

const Image = styled.img`
  height: 50vh;
  -webkit-user-drag: none;
  user-drag: none;
`;

export default Onboarding3;
