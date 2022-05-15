import { Layouts as S } from "./layouts";
import ImgSrc from "public/assets/img/onboarding/onboarding2.svg";

const Onboarding2 = () => {
  return (
    <S.Wrapper backgroundColor="#F8F9FA">
      <S.Container reverse={true}>
        <S.Content>
          <p>
            <em>발자취</em>를 통해
          </p>
          <p>
            입주생들과 <b>스터디, 맛집 꿀팁 등</b>
          </p>
          <p>
            다양한 정보를 <b>공유</b>해보세요!
          </p>
        </S.Content>
        <S.Image src={"/assets/img/onboarding/onboarding2.svg"} />
      </S.Container>
    </S.Wrapper>
  );
};

export default Onboarding2;
