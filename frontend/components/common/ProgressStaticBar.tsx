import React from "react";
import styled from "styled-components";

interface IPStaticBar {
  done: string;
}

const ProgressDiv = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1.4rem;
  .progress {
    background-color: #d8d8d8;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    border: none;
    position: relative;
    margin: 15px 0;
    height: 30px;
    width: 100%;
    /* color: #ffffff; */
    /* width: 300px; */
  }

  .progress-done {
    /* background: linear-gradient(to left, #ff9472, #ff9472); */
    /* background: linear-gradient(to left, #f2709c, #ff9472); */
    /* background-color: #ffd469; */
    background-color: #2e437a;

    /* box-shadow: 0 3px 3px -5px #ffd469, 0 2px 5px #ffb800; */
    box-shadow: 0 3px 3px -5px #ffd469, 0 2px 5px #2e437a;
    border-radius: 20px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 0;
    opacity: 0;
    transition: 1s ease 0.3s;
  }
`;

const ProgressStaticBar = ({ done }: IPStaticBar) => {
  const [style, setStyle] = React.useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    setStyle(newStyle);
  }, 200);
  return (
    <ProgressDiv>
      <div className="progress">
        <div className="progress-done" style={style}>
          {done}%
        </div>
      </div>
    </ProgressDiv>
  );
};

export default ProgressStaticBar;
