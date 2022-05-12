import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import {
  HeartIcon,
  BookmarkIcon,
  DotsVerticalIcon,
  ChatIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
  BookmarkIcon as BookmarkIconFilled,
} from "@heroicons/react/solid";

import {
  getBoardsDetail,
  postLikeBoards,
  postScrapBoards,
  postComment,
} from "api/community";
import Icon from "../common/Icon";
import { IPost } from "types";
import { userInfoState } from "atoms/atoms";

interface IPostDetail extends IPost {
  memberId: string;
  nickname: string;
  profileUrl: string | null;
  isHeart: 0 | 1;
  isScrap: 0 | 1;
}
export default function CommunityScrapCard({
  boardId,
  categoryName,
  content,
  createdAt,
  creator,
  dong,
  imgUrlList,
  heartCnt,
  commentCnt,
}: IPost) {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [boardDetail, setBoardDetail] = useState<IPostDetail>(
    {} as IPostDetail
  );
  const [isScrap, setIsScrap] = useState(true);
  const [isChanged, setIsChanged] = useState(false); // 변경 감지할 변수

  const handleClick = () => {
    router.push({
      pathname: "/community/detail",
      query: { boardId },
    });
  };
  const handleScrapBoard = async () => {
    if (!isScrap) {
      const data = {
        scrapYn: "Y",
      };
      // setIsScrap(!isScrap);
      await postScrapBoards(boardId as string, data as object)
        // .then((res) => setIsChanged((prev) => !prev))
        .then((res) => {
          setIsChanged((prev) => !prev);
          setIsScrap(!isScrap);
        })
        .catch((err) => console.log(err.message));
    } else {
      const data = {
        scrapYn: "N",
      };
      // setIsScrap(!isScrap);
      //
      await postScrapBoards(boardId as string, data as object)
        .then((res) => {
          setIsChanged((prev) => !prev);
          setIsScrap(!isScrap);
        })
        .catch((err) => console.log(err));
    }
  };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setComment(e.target.value);
  // };
  return (
    <CardContainer onClick={handleClick}>
      <CardContent>
        <div className="topContent">
          <Tag>{categoryName}</Tag>
          {isScrap ? (
            <BookmarkIconFilled
              onClick={handleScrapBoard}
              className="toggleIconFilled"
              // className="btn text-red-500"
            />
          ) : (
            <BookmarkIcon onClick={handleScrapBoard} className="toggleIcon" />
          )}
          {/* <Icon
            // mode={boardDetail.isScrap ? "fas" : "far"}
            // icon="bookmark"
            // color={boardDetail.isScrap ? "#FFB800" : "#646464"}
            // mode={boardDetail.isScrap ? "fas" : "far"}
            mode="fas"
            icon="bookmark"
            color={boardDetail.isScrap ? "#FFB800" : "#646464"}
            display="flex"
            onClick={handleScrapBoard}
          /> */}
        </div>
        <Content>
          <Typography fs="1.6rem" p="1rem 0">
            {content}
          </Typography>
          <ImageContainer>
            {imgUrlList?.map((item: string, idx: number) => (
              <div className="item" key={idx}>
                <Image src={item} alt="" layout="fill" />
              </div>
            ))}
          </ImageContainer>
          <FlexContainer>
            <Typography>
              {createdAt} | {creator} | {dong}{" "}
            </Typography>

            <FlexContainer>
              <Icon mode="fas" icon="comment" size="10px" />
              <Typography p="0 0.5rem">{commentCnt}</Typography>
              <Icon mode="fas" icon="heart" size="10px" />
              <Typography p="0 0.5rem">{heartCnt}</Typography>
            </FlexContainer>
          </FlexContainer>
        </Content>
      </CardContent>
    </CardContainer>
  );
}
const CardContainer = styled.div`
  background-color: #f4f4f4;
  padding: 1rem 0 0 0;
  // position: absolute;
  // z-index: 2;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem;
  position: relative;
  z-index: 2;
  .topContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 3;
    .toggleIconFilled {
      color: #ffb800;
      width: 3rem;
      z-index: 20;
      position: relative;
    }
    .toggleIcon {
      color: #ff6767;
      width: 3rem;
      z-index: 20;
      position: relative;
    }
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  width: 6rem;
  height: 2rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  color: #646464;
  padding: 0.1rem 1rem;
  border-radius: 3px;
`;

const Content = styled.div`
  background-color: #ffffff;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 1rem;
  .item {
    height: 10rem;
    position: relative;
  }
  .item:nth-child(1) {
    height: 21rem;
    grid-row: 1/3;
    grid-column: 1/2;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GrayButton = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.4rem;
  font-size: 1.4rem;
  background-color: #f0f0f0;
  color: #646464;
  padding: 0.8rem 1.6rem;
  border-radius: 5px;
  gap: 0.5rem;
`;
