import styled from "styled-components";
import React, { useEffect, useState } from "react";

import TodoItem from "./TodoItem";
import Image from "next/image";

import { getTodos, postTodos } from "../../../api/todo";
import { ITodo } from "../../../types";

const TodoDiv = styled.div`
  width: 100%;
  margin: 2.5rem 0;
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

const TodoNone = styled.div`
  width: 100%;
  font-size: 1.6rem;
`;

interface TodoProps {
  viewOnly: boolean;
  date: string;
}

export default function Todo({ viewOnly }: TodoProps) {
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
interface TodoForm {
  date: string;
  content: string;
}
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [inputForm, setInputForm] = useState<TodoForm>({
    date: date,
    content: "",
  });
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm((prev) => ({
      ...prev,
      date: date,
      content: e.target.value,
    }));
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (inputForm.content.length !== 0) {
        postTodos(inputForm)
          .then((res) => {
            console.log(res.data.data);
            alert("todo 등록 완료!");
            setInputForm((prev) => ({
              ...prev,
              content: "",
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("입력");
        document.getElementById("todo")?.focus();
      }
    }
  };

  useEffect(() => {
    getTodoList();
  }, [date]);

  return (
    <>
      <TodoDiv>
        <>
          {todoList.map((list) => (
            <TodoItem key={list.id} list={list} viewOnly={viewOnly} />
          ))}
        </>
        {viewOnly ? null : (
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
                id="todo"
                value={inputForm.content}
                type="text"
                placeholder="할 일을 입력해주세요"
                onChange={onInputChange}
                onKeyPress={onEnter}
              />
            </InputDiv>
          </TodoInputDiv>
        )}
      </TodoDiv>
    </>
  );
}
