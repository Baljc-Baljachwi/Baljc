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
  const handleScrapBoard = async (e: any) => {
    e.stopPropagation();
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
      await postScrapBoards(boardId as string, data as object)
        .then((res) => {
          setIsChanged((prev) => !prev);
          setIsScrap(!isScrap);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <CardContainer onClick={handleClick}>
      <CardContent>
        <div className="topContent">
          <Tag>{categoryName}</Tag>
          {isScrap ? (
            <BookmarkIconFilled
              onClick={handleScrapBoard}
              className="toggleIconFilled"
            />
          ) : (
            <BookmarkIcon onClick={handleScrapBoard} className="toggleIcon" />
          )}
          {/* <Icon
            mode={isScrap ? "fas" : "far"}
            icon="bookmark"
            color={isScrap ? "#FFB800" : "#646464"}
            display="flex"
            size="2rem"
            onClick={handleScrapBoard}
          /> */}
        </div>
        <Content>
          <Typography fs="1.6rem" p="1rem 0">
            {content}
          </Typography>
          {imgUrlList.length === 1 ? (
            <ImageContainer>
              {imgUrlList?.map((item: string, idx: number) => (
                <div className="item_1" key={idx}>
                  <Image src={item} alt="" layout="fill" />
                </div>
              ))}
            </ImageContainer>
          ) : imgUrlList.length === 2 ? (
            <ImageContainer2>
              {imgUrlList?.map((item: string, idx: number) => (
                <div className="item" key={idx}>
                  <Image src={item} alt="" layout="fill" />
                </div>
              ))}
            </ImageContainer2>
          ) : imgUrlList.length === 3 ? (
            <ImageContainer3>
              {imgUrlList?.map((item: string, idx: number) => (
                <div className="item" key={idx}>
                  <Image src={item} alt="" layout="fill" />
                </div>
              ))}
            </ImageContainer3>
          ) : (
            <></>
          )}
          <FlexContainer>
            <Typography fs="1.2rem" color="#878B93">
              {createdAt} | {creator} | {dong}{" "}
            </Typography>

            <FlexContainer>
              <Icon
                mode="fas"
                icon="comment"
                size="12px"
                color="#878B93"
                display="flex"
              />
              <Typography fs="1.2rem" color="#4D5158">
                {commentCnt}{" "}
              </Typography>
              <Icon
                mode="fas"
                icon="heart"
                size="12px"
                color="#878B93"
                display="flex"
              />
              <Typography fs="1.2rem" color="#4D5158">
                {heartCnt}
              </Typography>
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
  position: relative;
  z-index: 2;
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
      color: #ffb800;
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
  background-color: #8cbff2;
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
  color?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "")};
  color: ${(props) => (props.color ? props.color : "")};
`;

const ImageContainer = styled.div`
  display: grid;
  padding-bottom: 2rem;
  .item_1 {
    height: 20rem;
    position: relative;
  }
`;

const ImageContainer2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 2rem;
  .item {
    height: 20rem;
    position: relative;
  }
`;

const ImageContainer3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 2rem;
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
  align-items: center;
`;

const GrayButton = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.4rem;
  font-size: 1.4rem;
  background-color: #8cbff2;
  color: #ffffff;
  padding: 0.8rem 1.6rem;
  border-radius: 5px;
  gap: 0.5rem;
`;
