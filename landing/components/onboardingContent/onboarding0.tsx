import { Layouts as S } from "./layouts";
import styled from "styled-components";
import Image from "next/Image";

import ImgSrc from "public/assets/img/onboarding/onboarding1.gif";

const Text = styled.h1`
  font-weight: 300;
  letter-spacing: -0.05em;
  width: 100%;
  padding: 20px;
  & b {
    font-weight: 400;
  }
  & em {
    font-weight: bold;
    color: ${({ theme }) => theme.color.main};
  }
`;

// const TextMobile = styled(Text)`
//   display: none;
//   @media ${({ theme }) => theme.size.mobile} {
//     display: inline;
//     letter-spacing: -0.05em;
//     font-size: 20px;
//     line-height: 35px;
//     margin: 0 30px 10px;
//   }
// `;

const TextPC = styled(Text)`
  font-size: clamp(1.3rem, 2vw, 3rem);
  line-height: 1.8;
  margin-bottom: 2%;
  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 20px;
  overflow: hidden;
`;

const Onboarding0 = () => {
  return (
    <S.Wrapper backgroundColor="#FFD469">
      <S.Container>
        <ImageWrapper>
          <Image
            src={"/assets/img/onboarding/snapshot/finance.gif"}
            alt=""
            width={270}
            height={600}
          />
        </ImageWrapper>
        <S.Content>
          <p>자취를 하고 있는데 생각보다 새어나가는 돈이 많은 것 같나요?</p>
          <p>
            <em>발자취</em> 의 예산 계획과 지출 분석을 통해
            <br /> 내 소비 습관과 <b>지출 분석</b>을 해보세요!
          </p>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default Onboarding0;
