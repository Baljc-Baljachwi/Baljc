import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const router = useRouter();

  function onClick() {
    if (isEnd) {
      onBoardingEnd();
    } else {
      swiper.slideNext();
    }
  }
  return <span onClick={onClick}>{isEnd ? "시작하기" : "다음"}</span>;
}
