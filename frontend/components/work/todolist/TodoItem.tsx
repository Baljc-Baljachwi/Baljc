import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";

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

const TodoText = styled.p<{ isCompleted: boolean }>`
  font-size: 1.6rem;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "")};
`;

const IconDiv = styled.div<{ isClicked: boolean }>`
  gap: 1rem;
  display: ${(props) => (props.isClicked ? "flex" : "none")};
`;
interface listProps {
  id: number;
  content: string;
}

export default function TodoItem(props: { list: listProps }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [todoClicked, setTodoClicked] = useState(false);

  const todoComplete = (e: React.MouseEventHandler<HTMLImageElement>) => {
    setIsCompleted((prev) => !prev);
  };

  const todoItemClick = (e: React.MouseEventHandler<HTMLDivElement>) => {
    setTodoClicked((prev) => !prev);
    console.log(props.list.id + " : " + todoClicked);
  };

  return (
    <>
      <TodoListItem>
        {isCompleted ? (
          <Image
            src="/assets/img/foot_true.png"
            alt=""
            width={20}
            height={20}
            onClick={todoComplete}
          />
        ) : (
          <Image
            src="/assets/img/foot_false.png"
            alt=""
            width={20}
            height={20}
            onClick={todoComplete}
          />
        )}
        <TodoItemDiv>
          <TodoText isCompleted={isCompleted} onClick={todoItemClick}>
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
