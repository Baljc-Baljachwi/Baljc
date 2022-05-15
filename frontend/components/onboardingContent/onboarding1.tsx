import { Layouts as S } from "./layouts";
import ImgSrc from "public/assets/img/onboarding/onboarding1.gif";

const Onboarding1 = () => {
  return (
    <S.Wrapper backgroundColor="#DFF2FF">
      <S.Container>
        <S.Content>
          <p>혼자 사는데 신선식품이 너무 많이 남나요?</p>
          <p>
            <em>발자취</em>를 통해
            <br /> 동네 자취생들과 <b>물물교환/소분</b>을 해보세요!
          </p>
        </S.Content>
        <S.Image src={"/assets/img/onboarding/onboardinggif1.gif"} />
      </S.Container>
    </S.Wrapper>
  );
};

export default Onboarding1;
