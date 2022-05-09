import React from "react";
import styled from "styled-components";

interface SlideProps {
  img: string;
}

const IMG = styled.img``;

export default function Slide({ img }: SlideProps) {
  return <IMG src={img} />;
}
