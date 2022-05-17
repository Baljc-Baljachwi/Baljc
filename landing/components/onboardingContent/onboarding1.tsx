import { Layouts as S } from "./layouts";
import styled from 'styled-components';
import Image from "next/Image";

import ImgSrc from "public/assets/img/onboarding/onboarding1.gif";

const ImageWrapper = styled.div`
  border-radius: 25px;
  overflow: hidden;
`

const Onboarding1 = () => {
  return (
    <S.Wrapper backgroundColor="#fff8e6">
      <S.Container>
        <S.Content>
          <p>혼자 사는데 신선식품이 너무 많이 남나요?</p>
          <p>
            <em>발자취</em> 를 통해
            <br /> 동네 자취생들과 <b>물물교환/소분</b>을 해보세요!
          </p>
        </S.Content>
        <ImageWrapper>
          <Image
            src={"/assets/img/onboarding/snapshot/community.png"}
            alt=""
            width={270}
            height={600}
            />
        </ImageWrapper>
      </S.Container>
    </S.Wrapper>
  );
};

export default Onboarding1;
