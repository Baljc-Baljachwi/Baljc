import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";
import { ITodo } from "../../../types";
import { completedTodos, editTodos, deleteTodos } from "../../../api/todo";
import { ITodoTypes, todosState } from "../../../atoms/atoms";
import { SetterOrUpdater } from "recoil";

const TodoListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const TodoItemDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TodoImage = styled.img`
  width: 3.5rem;
  margin-bottom: 1.2rem;
`;

const TodoText = styled.span<{ viewOnly: boolean }>`
  width: 100%;
  font-size: 1.8rem;

  color: ${(props) => (props.viewOnly ? "#ffffff" : "")};
  display: flex;
  justify-content: space-between;
`;

const TodoNErrorDiv = styled.div``;

const TodoInput = styled.input<{
  isClicked: boolean;
  isEdit: boolean;
  viewOnly: boolean;
  isError: boolean;
  isCompleted: string;
}>`
  width: 90%;
  font-family: "Noto Sans KR";
  font-size: 1.8rem;
  color: ${(props) => (props.viewOnly ? "#ffffff" : "#000000")};
  background-color: ${(props) => (props.viewOnly ? "#4d5f8f" : "")};
  border: none;
  border-bottom: ${(props) =>
    props.isEdit
      ? "none"
      : props.isError
      ? "1px solid #ff0000"
      : "1px solid #cccccc"};
  outline: none;
  text-decoration: ${(props) =>
    props.isCompleted === "Y" ? "line-through" : ""};
`;

const ErrorMessage = styled.p<{ isError: boolean }>`
  height: 1.3rem;
  visibility: ${(props) => (props.isError ? "visible" : "hidden")};
  color: #ff0000;
  font-size: 1.2rem;
`;

const IconDiv = styled.div<{ isClicked: boolean }>`
  gap: 1.5rem;
  display: ${(props) => (props.isClicked ? "flex" : "none")};
`;

interface contentState {
  content: string;
}

interface PropTypes {
  todoId: string;
  date: string;
  content: string;
  completedYn: string;
  viewOnly: boolean;

  todos: ITodoTypes[];
  setTodos: SetterOrUpdater<ITodoTypes[]>;
}

export default function TodoItem({
  todoId,
  date,
  content,
  completedYn,
  viewOnly,
  todos,
  setTodos,
}: PropTypes) {
  const [todoClicked, setTodoClicked] = useState(false); // 수정 삭제 아이콘을 위한
  const [isClicked, setClicked] = useState(true); // todo 클릭 시, readOnly 변경 위한
  const [contentForm, setContentForm] = useState<contentState>({ content: "" });
  const [isError, setIsError] = useState(false);

  const todoRef = useRef() as React.MutableRefObject<HTMLSpanElement>;

  const todoComplete = (e: any) => {
    if (completedYn === "N") {
      completedTodos(todoId, { completedYn: "Y" })
        .then((res) => {
          // console.log(res.data.data);
          // 객체 업데이트
          setTodos(
            todos.map((todo: ITodoTypes) => {
              return todo.todoId === todoId
                ? { ...todo, completedYn: "Y" }
                : todo;
            })
          );
        })
        .catch((err) => // console.log(err));
    } else {
      completedTodos(todoId, { completedYn: "N" })
        .then((res) => {
          // console.log(res.data.data);
          setTodos(
            todos.map((todo: ITodoTypes) => {
              return todo.todoId === todoId
                ? { ...todo, completedYn: "N" }
                : todo;
            })
          );
        })
        .catch((err) => // console.log(err));
    }
  };

  const onEnter = (e: any) => {
    if (e.key === "Enter") {
      if (!isError) {
        editTodos(e.target.id, contentForm)
          .then((res) => {
            // console.log(res);
            setTodos(
              todos.map((todo: ITodoTypes) => {
                return todo.todoId === todoId
                  ? { ...todo, content: contentForm.content }
                  : todo;
              })
            );
            setTodoClicked(false);
            setClicked(true);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsError(false);
      setContentForm((prev) => ({
        ...prev,
        content: e.target.value,
      }));
    } else {
      setIsError(true);
      setContentForm((prev) => ({
        ...prev,
        content: e.target.value,
      }));
    }
    // console.log(isError);
  };

  const deleteTodo = () => {
    deleteTodos(todoId)
      .then((res) => {
        // console.log(res);
        setTodos(todos.filter((todo: ITodoTypes) => todo.todoId !== todoId));
      })
      .catch((err) => console.log(err));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTodoClicked(true);
    setClicked(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isError) {
      editTodos(e.target.id, contentForm)
        .then((res) => {
          // console.log(res);
          setTodos(
            todos.map((todo: ITodoTypes) => {
              return todo.todoId === todoId
                ? { ...todo, content: contentForm.content }
                : todo;
            })
          );
          setTodoClicked(false);
          setClicked(true);
        })
        .catch((err) => console.log(err));
    } else {
      document.getElementById(todoId)?.focus();
    }
  };

  useEffect(() => {
    setIsError(false);
    setContentForm({ content: content });
  }, [content]);

  return (
    <>
      <TodoListItem>
        {completedYn === "Y" ? (
          <TodoImage
            src="/assets/img/foot_true.png"
            alt=""
            onClick={todoComplete}
          />
        ) : (
          <TodoImage
            src="/assets/img/foot_false.png"
            alt=""
            onClick={todoComplete}
          />
        )}
        <TodoItemDiv>
          <TodoText viewOnly={viewOnly} ref={todoRef}>
            <TodoNErrorDiv>
              <TodoInput
                id={todoId}
                value={contentForm.content}
                onChange={onInputChange}
                isCompleted={completedYn}
                isClicked={todoClicked}
                isEdit={isClicked} // false일 때, input 밑줄 생기게
                isError={isError}
                onKeyPress={onEnter}
                onFocus={handleFocus}
                onBlur={handleBlur}
                viewOnly={viewOnly}
              />
              <ErrorMessage isError={isError}>
                1자 이상 입력해주세요 !
              </ErrorMessage>
            </TodoNErrorDiv>
            <IconDiv isClicked={todoClicked}>
              {/* <Icon
                mode="fas"
                icon="pen"
                color="#cccccc"
                size="1.8rem"
                onClick={() => editTodo()}
              /> */}
              <Icon
                mode="fas"
                icon="trash-can"
                color="#cccccc"
                size="1.8rem"
                onClick={() => deleteTodo()}
              />
            </IconDiv>
          </TodoText>
        </TodoItemDiv>
      </TodoListItem>
    </>
  );
}
