import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";
import { ITodo } from "../../../types";
import { completedTodos, editTodos, deleteTodos } from "../../../api/todo";

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

const TodoInput = styled.input<{ isClicked: boolean; isEdit: boolean }>`
  font-family: "Noto Sans KR";
  font-size: 1.8rem;
  color: #3d3d3d;
  border: none;
  border-bottom: ${(props) =>
    props.isEdit ? "1px solid #ffffff" : " 1px solid #cccccc"};
  outline: none;
`;

const IconDiv = styled.div<{ isClicked: boolean }>`
  gap: 1.5rem;
  display: ${(props) => (props.isClicked ? "flex" : "none")};
`;

interface contentState {
  content: string;
}

export default function TodoItem(props: { list: ITodo; viewOnly: boolean }) {
  const [isCompleted, setCompleted] = useState(false);
  const [todoClicked, setTodoClicked] = useState(false); // 수정 삭제 아이콘을 위한
  const [isClicked, setClicked] = useState(true); // todo 클릭 시, readOnly 변경 위한
  const [contentForm, setContentForm] = useState<contentState>({ content: "" });

  const todoRef = useRef() as React.MutableRefObject<HTMLSpanElement>;

  const todoComplete = (e: any) => {
    // console.log("isCompleted : " + isCompleted);
    if (!isCompleted) {
      completedTodos(props.list.todoId, { completedYn: "Y" })
        .then((res) => {
          console.log(res.data.data);
          setCompleted((prev) => !prev);
        })
        .catch((err) => console.log(err));
    } else {
      completedTodos(props.list.todoId, { completedYn: "N" })
        .then((res) => {
          console.log(res.data.data);
          setCompleted((prev) => !prev);
          // setCompleted(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const todoItemClick = (e: any) => {
    if (todoRef && !todoRef.current.contains(e.target)) {
      // console.log(11, todoRef);
      setTodoClicked(false);
      setClicked(true);
    } else {
      // console.log(todoRef.current.contains(e.target));
      // console.log(e.target.id); // todoId
      // console.log(content);
      setTodoClicked(true);
      setClicked(false);
      console.log(contentForm.content);
    }
  };

  // React.KeyboardEvent
  const onEnter = (e: any) => {
    // console.log(e.target.id);
    if (e.key === "Enter") {
      editTodos(e.target.id, contentForm)
        .then((res) => {
          console.log(res);
          setTodoClicked(false);
          setClicked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setContentForm((prev) => ({
      ...prev,
      content: e.target.value,
    }));
    console.log(contentForm.content);
  };

  const editTodo = () => {
    console.log(todoClicked);
    console.log(props.list.content, "변경하자");
    // 수정 중에 다른 곳으로 이동하면 ?
  };


  useEffect(() => {
    setContentForm({ content: props.list.content });

    if (props.list.completedYn === "Y") {
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
          <TodoText
            isCompleted={isCompleted}
            viewOnly={props.viewOnly}
            ref={todoRef}
          >
            <TodoInput
              id={props.list.todoId}
              value={contentForm.content}
              onChange={onInputChange}
              isClicked={todoClicked}
              isEdit={isClicked} // false일 때, input 밑줄 생기게
              onKeyPress={onEnter}
              readOnly={isClicked} // false일 때, 수정 가능
            />
            <IconDiv isClicked={todoClicked}>
              {/* <Icon
                mode="fas"
                icon="pen"
                color="#cccccc"
                size="1.8rem"
                onClick={() => editTodo()}
              /> */}
          </TodoText>
        </TodoItemDiv>
      </TodoListItem>
    </>
  );
}
