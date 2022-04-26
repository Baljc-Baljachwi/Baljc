import styled from "styled-components";
import React, { useState } from "react";

import TodoItem from "./TodoItem";

const TodoDiv = styled.div`
  width: 100%;
  margin: 3rem 0;
`;

const TodoInput = styled.div``;

export default function Todo() {
  // 잠깐 넣어둔 리스트
  const todoList = [
    {
      id: 1,
      content: "병원 예약하기",
    },
    {
      id: 2,
      content: "타입스크립트 공부하기",
    },
    {
      id: 3,
      content: "운동가기",
    },
  ];

  return (
    <>
      <TodoDiv>
        <>
          {todoList.map((list) => (
            <TodoItem key={list.id} list={list} />
          ))}
        </>
        <TodoInput></TodoInput>
      </TodoDiv>
    </>
  );
}
