import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getMyBoardList } from "api/mypage";
import { IPost, IMyBoard } from "types";
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
  const [myBoardList, setMyBoardList] = useState<IMyBoard[]>();

  useEffect(() => {
    if (isLoading) {
      getMyBoardList()
        .then((res) => {
          setMyBoardList(res.data.data);
        })
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoading]);
  return (
    <>
      <Header
        label="내가 쓴 글 목록"
        onClickBackButton={() => router.push("/mypage")}
      ></Header>
      {isLoading ? (
        <Spinner
          color="#cdcdcd"
          size="30"
          display="flex"
          justifyContent="center"
          alignItems="center"
        />
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
                  작성한 글이 없습니다!
                  <NoContentMessage className="small">
                    커뮤니티에서 글을 써보세요!
                  </NoContentMessage>
                </NoContentMessage>
              </NoContentContainer>
            )}
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
  height: 100%;
`;

const BodyContainer = styled.div`
  padding: 0 0 1rem 0;
`;

const NoContentContainer = styled.section`
  width: 100%;
  height: calc(100vh - 13.2rem);
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
