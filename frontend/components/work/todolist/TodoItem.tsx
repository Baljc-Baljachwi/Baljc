import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";
import { ITodo } from "../../../types";
import { completedTodo } from "../../../api/todo";

const TodoListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

const TodoItemDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TodoText = styled.span<{ isCompleted: boolean; viewOnly: boolean }>`
  font-size: 1.6rem;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "")};
  color: ${(props) => (props.viewOnly ? "#ffffff" : "")};
`;

const IconDiv = styled.div<{ isClicked: boolean }>`
  gap: 1rem;
  display: ${(props) => (props.isClicked ? "flex" : "none")};
`;

export default function TodoItem(props: { list: ITodo; viewOnly: boolean }) {
  const [isCompleted, setCompleted] = useState(false);
  const [todoClicked, setTodoClicked] = useState(false);
  const todoRef = useRef() as React.MutableRefObject<HTMLSpanElement>;

  const todoComplete = (e: any) => {
    // console.log("isCompleted : " + isCompleted);
    if (!isCompleted) {
      completedTodo(props.list.todoId, { completedYn: "Y" })
        .then((res) => {
          console.log(res.data.data);
          setCompleted((prev) => !prev);
        })
        .catch((err) => console.log(err));
    } else {
      completedTodo(props.list.todoId, { completedYn: "N" })
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
      setTodoClicked(false);
    } else {
      setTodoClicked(true);
    }
  }

  useEffect(() => {
    // console.log(props.list.completedYn);
    if (props.list.completedYn === "Y") {
      setCompleted(true);
    } else setCompleted(false);

    window.addEventListener("mousedown", todoItemClick);
    return () => {
      window.removeEventListener("mousedown", todoItemClick);
    };
  }, [props]);

  return (
    <>
      <TodoListItem>
        {isCompleted ? (
          <Image
            src="/assets/img/foot_true.png"
            alt=""
            width={25}
            height={25}
            onClick={todoComplete}
          />
        ) : (
          <Image
            src="/assets/img/foot_false.png"
            alt=""
            width={25}
            height={25}
            onClick={todoComplete}
          />
        )}
        <TodoItemDiv>
          <TodoText
            isCompleted={isCompleted}
            viewOnly={props.viewOnly}
            ref={todoRef}
          >
            {props.list.content}
          </TodoText>
          <IconDiv isClicked={todoClicked}>
            <Icon mode="fas" icon="pen" color="#cccccc" size="1.5rem" />
            <Icon mode="fas" icon="trash-can" color="#cccccc" size="1.5rem" />
          </IconDiv>
        </TodoItemDiv>
      </TodoListItem>
    </>
  );
}
