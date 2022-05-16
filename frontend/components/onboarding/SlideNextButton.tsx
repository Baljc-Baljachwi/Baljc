import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

interface SlideNextButtonProps {
  isEnd: boolean;
}

export default function SlideNextButton({ isEnd }: SlideNextButtonProps) {
  const swiper = useSwiper();
  const router = useRouter();

  function onClick() {
    if (isEnd) {
      router.push("/");
    } else {
      swiper.slideNext();
    }
  }
  return <span onClick={onClick}>{isEnd ? "계속" : "다음"}</span>;
}
