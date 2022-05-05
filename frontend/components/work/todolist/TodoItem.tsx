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
  margin: 1rem 0;
`;

const TodoItemDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TodoText = styled.span<{ isCompleted: boolean; viewOnly: boolean }>`
  width: 100%;
  font-size: 1.8rem;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "")};
  color: ${(props) => (props.viewOnly ? "#ffffff" : "")};
  display: flex;
  justify-content: space-between;
`;

const TodoInput = styled.input<{
  isClicked: boolean;
  isEdit: boolean;
  viewOnly: boolean;
}>`
  font-family: "Noto Sans KR";
  font-size: 1.8rem;
  color: ${(props) => (props.viewOnly ? "#ffffff" : "#000000")};
  background-color: ${(props) => (props.viewOnly ? "#4d5f8f" : "")};
  border: none;
  border-bottom: ${(props) => (props.isEdit ? "" : " 1px solid #cccccc")};
  outline: none;
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
  const [isCompleted, setCompleted] = useState(false);
  const [todoClicked, setTodoClicked] = useState(false); // 수정 삭제 아이콘을 위한
  const [isClicked, setClicked] = useState(true); // todo 클릭 시, readOnly 변경 위한
  const [contentForm, setContentForm] = useState<contentState>({ content: "" });

  const todoRef = useRef() as React.MutableRefObject<HTMLSpanElement>;

  const todoComplete = (e: any) => {
    // console.log("isCompleted : " + isCompleted);
    if (!isCompleted) {
      completedTodos(todoId, { completedYn: "Y" })
        .then((res) => {
          console.log(res.data.data);
          // 객체 업데이트
          // setTodos(
          //   todos.map((todo: ITodoTypes) => {
          //     return todo.todoId === todoId
          //       ? { ...todo, completedYn: "Y" }
          //       : todo;
          //   })
          // );
          setCompleted((prev) => !prev);
        })
        .catch((err) => console.log(err));
    } else {
      completedTodos(todoId, { completedYn: "N" })
        .then((res) => {
          console.log(res.data.data);
          setCompleted((prev) => !prev);
          // setCompleted(false);
        })
        .catch((err) => console.log(err));
    }
  };

  function todoItemClick(e: any) {
    if (todoRef && !todoRef.current.contains(e.target)) {
      // console.log(11, todoRef);
      setTodoClicked(false);
      setClicked(true);
    } else {
      setTodoClicked(true);
      setClicked(false);
    }
  }

  // React.KeyboardEvent
  const onEnter = (e: any) => {
    if (e.key === "Enter") {
      if (contentForm.content.length !== 0) {
        editTodos(e.target.id, contentForm)
          .then((res) => {
            console.log(res);
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
    setContentForm((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const deleteTodo = () => {
    deleteTodos(todoId)
      .then((res) => {
        console.log(res);
        setTodos(todos.filter((todo: ITodoTypes) => todo.todoId !== todoId));
      })
      .catch((err) => console.log(err));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {};

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (contentForm.content.length !== 0) {
      editTodos(e.target.id, contentForm)
        .then((res) => {
          console.log(res);
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
  };

  useEffect(() => {
    setContentForm({ content: content });

    if (completedYn === "Y") {
      setCompleted(true);
    } else setCompleted(false);

    window.addEventListener("mousedown", todoItemClick);
    return () => {
      window.removeEventListener("mousedown", todoItemClick);
    };
  }, []);

  return (
    <>
      <TodoListItem>
        {isCompleted ? (
          <Image
            src="/assets/img/foot_true.png"
            alt=""
            width={30}
            height={30}
            onClick={todoComplete}
          />
        ) : (
          <Image
            src="/assets/img/foot_false.png"
            alt=""
            width={30}
            height={30}
            onClick={todoComplete}
          />
        )}
        <TodoItemDiv>
          <TodoText isCompleted={isCompleted} viewOnly={viewOnly} ref={todoRef}>
            <TodoInput
              id={todoId}
              value={contentForm.content}
              onChange={onInputChange}
              isClicked={todoClicked}
              isEdit={isClicked} // false일 때, input 밑줄 생기게
              onKeyPress={onEnter}
              readOnly={isClicked} // false일 때, 수정 가능
              onFocus={handleFocus}
              onBlur={handleBlur}
              viewOnly={viewOnly}
            />
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
