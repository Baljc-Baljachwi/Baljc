import styled from "styled-components";

import Icon from "../../common/Icon";

const InputContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
  margin: 1.6rem 0 4rem 0;
  color: #cccccc;
  :focus-within {
    border-bottom: 1px solid #3d3d3d;
    span {
      color: #3d3d3d;
    }
  }
  font-size: 2rem;
  display: flex;
  gap: 1rem;
`;

// 입력 Input 뒤에 단위 나타내는 텍스트
const InputUnit = styled.span<{ hasValue: boolean }>`
  line-height: 2rem;
  word-break: keep-all;
  color: ${(props) => (props.hasValue ? "#3d3d3d" : "#cccccc")};
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 2rem;
  text-align: end;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: #3d3d3d;
  ::placeholder {
    color: #cccccc;
  }
`;

const StyledLabel = styled.label`
  font-size: 2rem;
  color: #3d3d3d;
  /* font-weight: 500; */
  display: inline-block;
  margin-top: 1.6rem;
`;

const StyledCheckBox = styled.input`
  width: 1.6rem;
  :checked + label {
    content: "\f14a";
  }
`;

const CheckLabel = styled.label`
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid #cccccc;
  border-radius: 3px;

  cursor: pointer;
`;

export default function CostForm() {
  return (
    <>
      <StyledLabel>제목</StyledLabel>
      <InputContainer>
        <StyledInput />
      </InputContainer>

      <StyledLabel>금액</StyledLabel>
      <InputContainer>
        <StyledInput type="number" placeholder="0" />
        <InputUnit hasValue={false}>원</InputUnit>
      </InputContainer>
      <StyledCheckBox type="checkbox" id="fixed" />
      <CheckLabel htmlFor="fixed">
        {/* <Icon
          mode="fas"
          icon="square-check"
          color="#ffd469"
          size="1.6rem"
        ></Icon>
        <Icon mode="far" icon="square" color="#ffd469" size="1.6rem"></Icon> */}
      </CheckLabel>
      <label htmlFor="fixed">고정지출</label>

      <StyledLabel>날짜</StyledLabel>
      <InputContainer>
        <StyledInput type="date" />
      </InputContainer>

      <StyledLabel>시각</StyledLabel>
      <InputContainer>
        <StyledInput type="time" />
      </InputContainer>

      <StyledLabel>카테고리</StyledLabel>

      <StyledLabel>결제 수단</StyledLabel>

      <StyledLabel>메모</StyledLabel>
      <InputContainer>
        <StyledInput type="text" placeholder="메모 남기기" />
      </InputContainer>
    </>
  );
}
