import { useState } from "react";
import styled from "styled-components";

const ToggleButtonContainer = styled.div`
  width: 4rem;
  position: relative;
  display: flex;
  align-items: center;
`;

const ToggleButtonBackGround = styled.div<{ isOn: boolean }>`
  width: 100%;
  height: 1.6rem;
  background-color: ${(props) => (props.isOn ? "#FFD469" : "#aaaaaa")};
  border-radius: 4rem;
`;

const ToggleButtonCircle = styled.div<{ isOn: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #cacad8;
  position: absolute;
  box-shadow: 2px 0px 8px rgba(31, 29, 33, 0.1);
  left: ${(props) => (props.isOn ? "calc(100% - 2.4rem)" : "0")};
  transition: linear 0.03s;
`;

export default function ToggleButton() {
  const [isOn, setIsOn] = useState<boolean>(false);

  function handleToggleButton(event: any) {
    setIsOn((prev) => !prev);
  }
  return (
    <ToggleButtonContainer onClick={handleToggleButton}>
      <ToggleButtonBackGround isOn={isOn} />
      <ToggleButtonCircle isOn={isOn} />
    </ToggleButtonContainer>
  );
}
