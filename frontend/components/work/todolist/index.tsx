import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import TodoItem from "./TodoItem";
import Icon from "../../common/Icon";

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
  gap: 1.5rem;
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoInput = styled.input<{ isFocus: boolean; monthlyTodo: boolean }>`
  width: 90%;
  font-family: "Noto Sans KR";
  font-size: 1.8rem;
  font-size: ${(props) => (props.monthlyTodo ? "1.6rem" : "1.8rem")};
  color: ${(props) => (props.monthlyTodo ? "#ffffff" : "#000000")};
  background-color: ${(props) => (props.monthlyTodo ? "#4d5f8f" : "")};
  border: none;
  border-bottom: ${(props) => (props.isFocus ? "1px solid #cccccc" : " ")};
  outline: none;
  ::placeholder {
    color: #cccccc;
    color: ${(props) => (props.monthlyTodo ? "#ffffff" : "#cccccc")};
  }
  margin-bottom: 1.3rem;
`;

const IconDiv = styled.div<{ isClicked: boolean }>`
  gap: 1rem;
  display: ${(props) => (props.isClicked ? "flex" : "none")};
`;

const TodoNone = styled.div`
  width: 100%;
  font-size: 1.6rem;
`;

const TodoImage = styled.img`
  width: 3rem;
  margin-bottom: 1.2rem;
`;

interface TodoProps {
  monthlyTodo: boolean;
  date: string;
}

interface TodoForm {
  date: string;
  content: string;
}

export default function Todo({ monthlyTodo, date }: TodoProps) {
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);
  const [focus, setFocus] = useState(false);

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
        // console.log(err);
      });
  }, [date, setTodos]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm((prev) => ({
      ...prev,
      date: date,
      content: e.target.value,
    }));
  };

  const postTodosFunc = () => {
    if (inputForm.content.length !== 0) {
      postTodos(inputForm)
        .then((res) => {
          // console.log(res.data.data);
          // alert("todo 등록 완료!");
          setInputForm((prev) => ({
            ...prev,
            content: "",
          }));
          getTodoList();
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    // else {
    // document.getElementById("todo")?.focus();
    // }
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      postTodosFunc();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus((prev) => !prev);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus((prev) => !prev);
    postTodosFunc();
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
                  monthlyTodo={monthlyTodo}
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
            <TodoImage src="/assets/img/foot_false.png" alt="" />
            <InputDiv>
              <TodoInput
                name="todo"
                id="todo"
                value={inputForm.content}
                type="text"
                placeholder="할 일을 입력해주세요"
                onChange={onInputChange}
                onKeyPress={onEnter}
                isFocus={focus}
                monthlyTodo={monthlyTodo}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <IconDiv isClicked={focus}>
                {/* <Icon
                mode="fas"
                icon="pen"
                color="#cccccc"
                size="1.8rem"
                onClick={() => editTodo()}
              /> */}
                <Icon
                  mode="fas"
                  icon="check"
                  color="#cccccc"
                  size="2rem"
                  onClick={() => postTodosFunc()}
                />
              </IconDiv>
            </InputDiv>
          </TodoInputDiv>
        }
      </TodoDiv>
    </>
  );
}
