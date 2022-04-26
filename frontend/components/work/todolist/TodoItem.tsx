import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

const TodoListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

const TodoText = styled.p<{ isCompleted: boolean }>`
  font-size: 1.6rem;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "")};
`;
interface listProps {
  id: number;
  content: string;
}

export default function TodoItem(props: { list: listProps }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const todoComplete = (e: React.MouseEventHandler<HTMLImageElement>) => {
    setIsCompleted((prev) => !prev);
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
        <TodoText isCompleted={isCompleted}>{props.list.content}</TodoText>
      </TodoListItem>
    </>
  );
}
