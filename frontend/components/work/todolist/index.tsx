import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";

import TodoItem from "./TodoItem";
import Image from "next/image";

import { getTodos, postTodos } from "../../../api/todo";
import { ITodo } from "../../../types";
import { atom, useRecoilState } from "recoil";
import { todosState, ITodoTypes } from "../../../atoms/atoms";

const TodoDiv = styled.div`
  width: 100%;
  margin: 3rem 0;
`;

const TodoInputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const InputDiv = styled.div`
  width: 100%;
`;

const TodoInput = styled.input<{ viewOnly: boolean }>`
  width: 100%;
  font-family: "Noto Sans KR";
  font-size: 1.8rem;
  color: ${(props) => (props.viewOnly ? "#ffffff" : "#000000")};
  background-color: ${(props) => (props.viewOnly ? "#4d5f8f" : "")};
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  ::placeholder {
    color: #cccccc;
    color: ${(props) => (props.viewOnly ? "#ffffff" : "#cccccc")};
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

interface TodoForm {
  date: string;
  content: string;
}

export default function Todo({ viewOnly, date }: TodoProps) {
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);

  // const [todos, setTodos] = useState<ITodo[]>([]);
  const [inputForm, setInputForm] = useState<TodoForm>({
    date: date,
    content: "",
  });

  const getTodoList = useCallback(() => {
    getTodos(date)
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date, setTodos]);

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
            getTodoList();
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
  }, [getTodoList]);

  return (
    <>
      <TodoDiv>
        <>
          {todos.length > 0 ? (
            todos.map((todo, index) => {
              const { todoId, date, content, completedYn } = todo;
              return (
                <TodoItem
                  key={todoId}
                  todoId={todoId}
                  date={date}
                  content={content}
                  completedYn={completedYn}
                  viewOnly={viewOnly}
                  todos={todos}
                  setTodos={setTodos}
                ></TodoItem>
              );
            })
          ) : (
            // <TodoNone>todo list를 채워주세요 !</TodoNone>
            <></>
          )}
        </>
        {
          <TodoInputDiv>
            <Image
              src="/assets/img/foot_false.png"
              alt=""
              width={30}
              height={30}
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
                viewOnly={viewOnly}
              />
            </InputDiv>
          </TodoInputDiv>
        }
      </TodoDiv>
    </>
  );
}
