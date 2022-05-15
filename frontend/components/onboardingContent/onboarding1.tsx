import { Layouts as S } from "./layouts";
import ImgSrc from "public/assets/img/onboarding/onboarding1.gif";

const Onboarding1 = () => {
  return (
    <S.Wrapper backgroundColor="#DFF2FF">
      <S.Container>
        <S.Content>
          <p>기숙사에 생필품이 너무 많나요?</p>
          <p>
            <em>발자취</em>를 통해
            <br /> 입주생들과 <b>물물교환</b>을 해보세요!
          </p>
        </S.Content>
        <S.Image src={"/assets/img/onboarding/onboarding1.gif"} />
      </S.Container>
    </S.Wrapper>
  );
};

export default Onboarding1;
// import React from "react";

// function onboarding1() {
//   return <div>onboarding1</div>;
// }

// export default onboarding1;
