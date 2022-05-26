import { useSwiper } from "swiper/react";

interface SlideNextButtonProps {
  isEnd: boolean;
  onBoardingEnd: () => void;
}

export default function SlideNextButton({
  isEnd,
  onBoardingEnd,
}: SlideNextButtonProps) {
  const swiper = useSwiper();

  function onClick() {
    if (isEnd) {
      onBoardingEnd();
    } else {
      swiper.slideNext();
    }
  }
  return <span onClick={onClick}>{isEnd ? "시작하기" : "다음"}</span>;
}
