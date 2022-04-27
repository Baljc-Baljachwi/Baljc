import React, { Fragment } from "react";
import styled from "styled-components";

const DayButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const DayButton = styled.label<{ isSelected: boolean }>`
  width: 3.6rem;
  height: 3.6rem;
  text-align: center;
  line-height: 3.6rem;
  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? "#FFD469" : "#f5f6fa")};
  color: ${(props) => (props.isSelected ? "#3d3d3d" : "#797979")};
  font-size: 1.4rem;
  font-weight: 400;
`;

interface ButtonDaySelectProps {
  selectedDays: number | null;
  handleWeeklyDayUpdate: (value: number) => void;
}

export default function ButtonDaySelect({
  selectedDays,
  handleWeeklyDayUpdate,
}: ButtonDaySelectProps) {
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];
  function onClickDayButton(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(selectedDays);
    handleWeeklyDayUpdate(+event.target.value);
  }
  return (
    <DayButtonContainer>
      {dayList.map((value, index) => {
        const checked =
          selectedDays === null
            ? false
            : selectedDays & (1 << (6 - index))
            ? true
            : false;
        return (
          <Fragment key={index}>
            <input
              id={value}
              name={value}
              type="checkbox"
              checked={checked}
              value={6 - index}
              onChange={onClickDayButton}
              style={{ display: "none" }}
            />
            <DayButton htmlFor={value} isSelected={checked}>
              {value}
            </DayButton>
          </Fragment>
        );
      })}
    </DayButtonContainer>
  );
}
