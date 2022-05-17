import { Layouts as S } from "./layouts";

import styled from 'styled-components';
import Image from "next/Image";

import ImgSrc from "public/assets/img/onboarding/onboarding2.svg";

const ImageWrapper = styled.div`
  overflow: hidden;
`

const Onboarding2 = () => {
  return (
    <S.Wrapper backgroundColor="#FFD469">
      <S.Container reverse={true}>
        <S.Content>
          <p>
            <em>발자취</em> 를 통해
          </p>
          <p>
            자취생들과 <b>커뮤니티, 스터디, 맛집 꿀팁 등</b>
          </p>
          <p>
            다양한 정보를 <b>공유</b>해보세요!
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

export default Onboarding2;
