import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getBoardsCategories, getBoardsList } from "api/community";
import { getMyBoardList, getScrapBoardList } from "api/mypage";
import { IPost, IMyBoard } from "types";

import Header from "components/common/Header";
import CommunityCard from "components/community/CommunityCard";

interface IBoardCategory {
  boardCategoryId: string;
  imgUrl: string;
  name: string;
}

const Board = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [boardCategories, setBoardCategories] = useState<IBoardCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "271105c2-f94c-47bc-8af4-dc156dcad3eb"
  );
  const [idx, setIdx] = useState<number>(0);
  const [posts, setPosts] = useState<IPost[]>();
  const [myBoardList, setMyBoardList] = useState<IMyBoard[]>();

  // useEffect(() => {
  //   setReady(true);
  // }, []);
  // if (!ready) {
  //   return null;
  // }

  useEffect(() => {
    getMyBoardList()
      .then((res) => {
        console.log("하이");
        console.log(res.data.data);
        setMyBoardList(res.data.data);
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }, []);
  // console.log(posts);
  // console.log(myBoardList);
  return (
    <>
      <Header label="내가 쓴 글 목록"></Header>
      <Container>
        <BodyContainer>
          {myBoardList?.map((myBoardList: any) => (
            <CommunityCard
              key={myBoardList.boardId}
              boardId={myBoardList.boardId}
              categoryName={myBoardList.categoryName}
              content={myBoardList.content}
              createdAt={myBoardList.createdAt}
              creator={myBoardList.creator}
              dong={myBoardList.dong}
              imgUrlList={myBoardList.imgUrlList}
              heartCnt={myBoardList.heartCnt}
              commentCnt={myBoardList.commentCnt}
            />
          ))}
        </BodyContainer>
      </Container>
    </>
  );
};

export default Board;
Board.requireAuth = true;

const Container = styled.div`
  background-color: #f4f4f4;
  // padding: 1rem 0 0 0;
  // padding-bottom: 7rem;
`;

const FlexColumn = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
  m?: string;
  isSelected?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: "400";
  background-color: ${(props) => (props.isSelected ? "#F0F0F0" : "0")};
  margin: ${(props) => (props.m ? props.m : "0")};
  padding: ${(props) => (props.isSelected ? "0.2rem 1rem" : "0.2rem 1rem")};
  border-radius: ${(props) => (props.isSelected ? "5px" : "5px")};
`;

const BodyContainer = styled.div`
  padding: 0 0 1rem 0;
`;

const ChatButtonDiv = styled.div`
  width: 100%;
  position: fixed;
  bottom: 14rem;
  z-index: 1000;
`;
