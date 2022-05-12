import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getMyBoardList, getMyScrapList } from "api/mypage";
import { useRecoilValue } from "recoil";
import {
  getBoardsDetail,
  postLikeBoards,
  postScrapBoards,
  postComment,
} from "api/community";
import { IPost, IMyBoard } from "types";
import Icon from "components/common/Icon";
import { userInfoState } from "atoms/atoms";
// import NotFoundTransaction from "components/common/not-found-transaction/NotFoundTransaction";
// import Icon from "components/common/Icon";
import ButtonImage from "components/common/ButtonImage";
import Header from "components/common/Header";
// import CommunityCard from "components/community/CommunityCard";
import CommunityScrapCard from "components/community/CommunityScrapCard";
interface IPostDetail extends IPost {
  memberId: string;
  nickname: string;
  profileUrl: string | null;
  isHeart: 0 | 1;
  isScrap: 0 | 1;
}
interface IBoardCategory {
  boardCategoryId: string;
  imgUrl: string;
  name: string;
}
const Scrap = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [boardDetail, setBoardDetail] = useState<IPostDetail>(
    {} as IPostDetail
  );
  const [isScrap, setIsScrap] = useState(1);
  const [isChanged, setIsChanged] = useState(false); // 변경 감지할 변수

  const [ready, setReady] = useState(false);
  const [boardCategories, setBoardCategories] = useState<IBoardCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "271105c2-f94c-47bc-8af4-dc156dcad3eb"
  );
  const [idx, setIdx] = useState<number>(0);
  const [posts, setPosts] = useState<IPost[]>();
  const [myScrapList, setMyScrapList] = useState<IMyBoard[]>();
  const [boardId, setBoardId] = useState("");
  // const [likes, setLikes] = useState([])
  // const [hasLiked, setHasLiked] = useState(false)
  // const [isHeart, setHasLiked] = useState(false)
  const [bookmark, setBookmark] = useState(1);
  useEffect(() => {
    getMyScrapList()
      .then((res) => {
        console.log(res.data.data);
        setMyScrapList(res.data.data);
        setBoardId(res.data.data.boardId);
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }, []);
  const handleScrapBoard = () => {
    if (isScrap === 0) {
      const data = {
        scrapYn: "Y",
      };
      postScrapBoards(boardId as string, data as object)
        .then((res) => setIsChanged((prev) => !prev))
        .catch((err) => console.log(err.message));
    } else {
      const data = {
        scrapYn: "N",
      };
      postScrapBoards(boardId as string, data as object)
        .then((res) => setIsChanged((prev) => !prev))
        .catch((err) => console.log(err));
    }
  };

  // useEffect(() => {
  //   setReady(true);
  // }, []);
  // if (!ready) {
  //   return null;
  // }
  return (
    <>
      <Header
        label="스크랩한 글 목록"
        onClickBackButton={() => router.push("/mypage")}
      ></Header>
      <Container>
        <BodyContainer>
          {myScrapList?.length !== 0 ? (
            myScrapList?.map((myScrapList: any) => (
              <CommunityScrapCard
                key={myScrapList.boardId}
                boardId={myScrapList.boardId}
                categoryName={myScrapList.categoryName}
                content={myScrapList.content}
                createdAt={myScrapList.createdAt}
                creator={myScrapList.creator}
                dong={myScrapList.dong}
                imgUrlList={myScrapList.imgUrlList}
                heartCnt={myScrapList.heartCnt}
                commentCnt={myScrapList.commentCnt}
              />
            ))
          ) : (
            <NoContentContainer>
              <NoContentMessage>
                {/* <NotFoundTransaction /> */}
                스크랩한 글이 없습니다!
                <NoContentMessage className="small">
                  커뮤니티에서 우리 동네 소식을 알아볼까요?
                  {/* <div className="btn_MoveTo">동네 소식 보러 가기</div> */}
                </NoContentMessage>
                {/* <ButtonImage
                  label="동네 소식 보러 가기"
                  // onClick={router.push("/community")}
                ></ButtonImage> */}
              </NoContentMessage>
            </NoContentContainer>
          )}
        </BodyContainer>
      </Container>
    </>
  );
};

export default Scrap;
Scrap.requireAuth = true;

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
const NoContentContainer = styled.section`
  width: 100%;
  height: calc(100vh - 13.2rem);
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
