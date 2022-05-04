import { useState } from "react";
import styled from "styled-components";
import { YNType } from "types";

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
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
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
interface IToggleProps {
  isOn: YNType;
  onClick?: () => void;
}
export default function ToggleButton({ isOn, onClick }: IToggleProps) {
  // const [isOn, setIsOn] = useState<boolean>(false);

  // function handleToggleButton(event: any) {
  //   setIsOn((prev) => !prev);
  // }
  return (
    <ToggleButtonContainer onClick={onClick}>
      <ToggleButtonBackGround isOn={isOn === "Y"} />
      <ToggleButtonCircle isOn={isOn === "Y"} />
    </ToggleButtonContainer>
  );
}
