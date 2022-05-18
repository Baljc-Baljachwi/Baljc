import styled from "styled-components";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Image from "next/image";

import onboarding_accountboard from "public/assets/img/onboarding/snapshot/onboarding_accountboard.png";
import onboarding_calendar from "public/assets/img/onboarding/snapshot/onboarding_calendar.png";
import onboarding_graph from "public/assets/img/onboarding/snapshot/onboarding_graph.png";
import onboarding_work from "public/assets/img/onboarding/snapshot/onboarding_work.png";
import onboarding_community from "public/assets/img/onboarding/snapshot/onboarding_community.png";
import SlideNextButton from "components/onboarding/SlideNextButton";
import { useRouter } from "next/router";

const MainContainer = styled.main`
  background-color: #ffd469;
  width: 100%;
  height: 100vh;
  .swiperSlide {
    height: calc(100vh - 5.6rem);
    display: flex;
    gap: 10rem;
    flex-direction: column-reverse;
    align-items: center;
    @media (max-width: 376px) {
      height: calc(100vh - 4.6rem);
    }
    @media (max-height: 825px) {
      gap: 4rem;
    }
  }
  .swiper-pagination-bullets {
    /* position: absolute; */
    bottom: calc(100% - 5.6rem);
    @media (max-height: 825px) {
      bottom: calc(100% - 3rem);
    }
  }
  .swiper-pagination-bullet {
    width: 1rem;
    height: 1rem;
    background-color: #ffffff;
    opacity: 1;
    @media (max-height: 700px) {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  .swiper-pagination-bullet-active {
    width: 1rem;
    height: 1rem;
    background-color: #2e437a;
    opacity: 1;
    @media (max-width: 376px) {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;

const TextContainer = styled.section`
  text-align: center;
  white-space: pre-wrap;
  .title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.6rem;
    margin-bottom: 1.6rem;
  }
  .subtitle {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    height: 3.2rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 36rem;
  height: 48rem;
  @media (max-height: 700px) {
    width: 30rem;
    height: 40rem;
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  height: 5.6rem;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.6rem;
  padding: 2rem;
  @media (max-width: 376px) {
    height: 4.6rem;
    font-size: 1.4rem;
    line-height: 1.4rem;
    padding: 1.6rem;
  }
  .skip {
    color: #bbbbbb;
  }
`;

export default function OnBoarding() {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const router = useRouter();
  const InfoContents = [
    {
      pageName: "가계부",
      title: "충동적인 지출로\n 예산이 빠듯하신가요?",
      subtitle: "수입/지출을 기록하고 관리해보세요",
      image: "https://baljc.s3.ap-northeast-2.amazonaws.com/snapshot/onboarding_accountboard.png",
    },
    {
      pageName: "일과",
      title: "집안일을 까먹고\n밀리진 않았나요?",
      subtitle: "일과와 할 일을 기록하고\n알림을 받아보세요",
      image: "https://baljc.s3.ap-northeast-2.amazonaws.com/snapshot/onboarding_work.png",
    },
    {
      pageName: "커뮤니티",
      title: "혼자 사는데\n신선 식품이 너무 많이 남나요?",
      subtitle: "동네 사람들과 커뮤니티를 이용해보세요",
      image: "https://baljc.s3.ap-northeast-2.amazonaws.com/snapshot/onboarding_community.png",
    },
    {
      pageName: "지출 통계",
      title: "지출 내역을\n시각화해서 보고 싶으신가요?",
      subtitle: "통계 분석 리포트를 제공해드려요",
      image: "https://baljc.s3.ap-northeast-2.amazonaws.com/snapshot/onboarding_graph.png",
    },
    {
      pageName: "캘린더",
      title: "할 일을 꾸준히 관리하기가\n어려우신가요?",
      subtitle:
        "캘린더에 찍히는 귀여운 발바닥으로\n할 일을 재미있게 관리해보세요",
      image: "https://baljc.s3.ap-northeast-2.amazonaws.com/snapshot/onboarding_calendar.png",
    },
  ];

  function handleSlide(swiper: any) {
    setIsEnd(swiper.isEnd);
  }

  function onBoardingEnd() {
    localStorage.setItem("isNew", "false");
    router.push("/");
  }

  return (
    <MainContainer>
      <Swiper
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        className="swiper"
        onSlideChange={handleSlide}
      >
        {InfoContents.map((info, idx) => (
          <SwiperSlide key={idx} className="swiperSlide">
            <ImageContainer>
              <Image src={info.image} alt={info.pageName} layout="fill" />
            </ImageContainer>
            <TextContainer>
              <h1 className="title">{info.title}</h1>
              <p className="subtitle">{info.subtitle}</p>
            </TextContainer>
          </SwiperSlide>
        ))}
        <StyledFooter>
          <span className="skip" onClick={onBoardingEnd}>
            건너뛰기
          </span>
          <SlideNextButton isEnd={isEnd} onBoardingEnd={onBoardingEnd} />
        </StyledFooter>
      </Swiper>
    </MainContainer>
  );
}
