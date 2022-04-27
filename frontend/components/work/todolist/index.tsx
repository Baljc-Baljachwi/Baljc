import styled from "styled-components";
import React, { useState } from "react";

import TodoItem from "./TodoItem";
import Image from "next/image";

const TodoDiv = styled.div`
  width: 100%;
`;

const TodoInputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

const InputDiv = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;

const TodoInput = styled.input`
  width: 100%;
  font-family: "Noto Sans KR";
  font-size: 1.6rem;
  color: #3d3d3d;
  border: none;
  outline: none;
  ::placeholder {
    color: #cccccc;
  }
`;

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
        <TodoInputDiv>
          <Image
            src="/assets/img/foot_false.png"
            alt=""
            width={20}
            height={20}
          />
          <InputDiv>
            <TodoInput
              name="todo"
              type="text"
              placeholder="할 일을 입력해주세요"
            />
          </InputDiv>
        </TodoInputDiv>
      </TodoDiv>
    </>
  );
}
