import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
// import { getBoardsCategories, getBoardsList } from "api/community";
import { getMyBoardList, getMyScrapList } from "api/mypage";
import { IPost, IMyBoard } from "types";
import ButtonImage from "components/common/ButtonImage";
import Header from "components/common/Header";
import CommunityCard from "components/community/CommunityCard";
import Spinner from "components/common/Spinner";

interface IBoardCategory {
  boardCategoryId: string;
  imgUrl: string;
  name: string;
}

const Board = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
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
    if (isLoading) {
      getMyBoardList()
        .then((res) => {
          console.log("하이");
          console.log(res.data.data);
          setMyBoardList(res.data.data);
        })
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.log(err.data.message);
        });
    }
  }, [isLoading]);
  // console.log(posts);
  // console.log(myBoardList);
  return (
    <>
      <Header
        label="내가 쓴 글 목록"
        onClickBackButton={() => router.push("/mypage")}
      ></Header>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <BodyContainer>
            {myBoardList?.length !== 0 ? (
              myBoardList?.map((myBoardList: any) => (
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
              ))
            ) : (
              <NoContentContainer>
                <NoContentMessage>
                  {/* <NotFoundTransaction /> */}
                  작성한 글이 없습니다!
                  <NoContentMessage className="small">
                    커뮤니티에서 글을 써보세요!
                    {/* <div className="btn_MoveTo">동네 소식 보러 가기</div> */}
                  </NoContentMessage>
                  {/* <ButtonImage label="동네 소식 보러 가기"></ButtonImage> */}
                </NoContentMessage>
              </NoContentContainer>
            )}
            {/* {myBoardList?.map((myBoardList: any) => (
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
          ))} */}
          </BodyContainer>
        </Container>
      )}
    </>
  );
};

export default Board;
Board.requireAuth = true;

const Container = styled.div`
  background-color: #f4f4f4;
  /* height: calc(100vh - 13.2rem); */
  height: 100%;
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
const NoContentContainer = styled.section`
  width: 100%;
  height: calc(100vh - 13.2rem);
  // height: calc(100vh - 50rem);
  // height: 100%;
  // height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NoContentMessage = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
  padding: 1rem;
  color: #cccccc;
  &.small {
    font-size: 1.8rem;
    font-weight: 500;
    .btn_MoveTo {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const StyledButton = styled.button`
  color: #ffffff;
  padding: 1rem 1.2rem;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #8e8e8e;
  border-radius: 0.8rem;
  background-color: #ffffff;
  cursor: pointer;
`;
