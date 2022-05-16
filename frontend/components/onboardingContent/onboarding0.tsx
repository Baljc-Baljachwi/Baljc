import { Layouts as S } from "./layouts";
import ImgSrc from "public/assets/img/onboarding/onboarding1.gif";

const Onboarding0 = () => {
  return (
    <S.Wrapper backgroundColor="#DFF2FF">
      <S.Container>
        <S.Content>
          <p>자취를 하고 있는데 생각보다 새어나가는 돈이 많은 것 같나요?</p>
          <p>
            <em>발자취</em>의 예산 계획과 지출 분석을 통해
            <br /> 내 소비 습관과 <b>지출 분석</b>을 해보세요!
          </p>
        </S.Content>
        <S.Image
          src={"/assets/img/onboarding/snapshot/onboarding_cal_s20u0.png"}
        />
      </S.Container>
    </S.Wrapper>
  );
};

export default Onboarding0;
