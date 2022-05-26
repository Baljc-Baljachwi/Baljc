import Image from "next/image";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Header from "../../../components/common/Header";
import Icon from "../../../components/common/Icon";
import ImageModal from "../../../components/community/detail/CommunityImageModal";
import CommentCard from "components/community/detail/CommentCard";
import {
  getBoardsDetail,
  postLikeBoards,
  postScrapBoards,
  postComment,
  deleteBoards,
} from "api/community";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";
import { IPost, IComment } from "types";
import { userInfoState } from "atoms/atoms";
import ButtonModal from "components/common/ButtonModal";
import EditModal from "components/community/detail/EditModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-bottom: 1px solid #e8e8e8;
`;

const Tag = styled.div`
  display: inline;
  font-size: 1rem;
  background-color: #8cbff2;
  color: #ffffff;
  padding: 0.1rem 1rem;
  border-radius: 3px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0;
  > div {
    display: flex;
    gap: 2rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  padding: 0 0 1rem 0;
  white-space: pre-wrap;
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

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 10rem 2rem;
`;

const InputContainer = styled.div`
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 -1px 1px #00000014;
  border: none;
  position: fixed;
  width: 100%;
  max-width: 512px;
  bottom: 0;
  display: grid;
  grid-template-columns: 8fr 1fr;
  z-index: 11000;
  height: 5.6rem;
  margin-bottom: 5.55rem; // 나중에 없애기
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Input = styled.input`
  display: flex;
  background-color: #f2f3f6;
  border-radius: 30px;
  border: none;
  outline: none;
  padding: 0 2rem;
  font-size: 1.6rem;
  ::placeholder {
    /* outline: none; */
    color: #aeb1b9;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  padding-bottom: 1rem;
  .item_1 {
    height: 20rem;
    position: relative;
  }
`;

const ImageContainer2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 1rem;
  .item {
    height: 20rem;
    position: relative;
  }
`;

const ImageContainer3 = styled.div`
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

type imgInfo = { boardImgId: string; imgUrl: string };

interface IPostDetail extends IPost {
  memberId: string;
  nickname: string;
  profileUrl: string | null;
  isHeart: 0 | 1;
  isScrap: 0 | 1;
  imgInfoList: imgInfo[];
}

export default function CommunityDetail() {
  const router = useRouter();
  const boardId = router.query.boardId;
  const userInfo = useRecoilValue(userInfoState);
  const [zoomImg, setZoomImg] = useState(false); // 이미지 확대 모달
  const [boardDetail, setBoardDetail] = useState<IPostDetail>(
    {} as IPostDetail
  );
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [comment, setComment] = useState("");
  const [isChanged, setIsChanged] = useState(false); // 변경 감지할 변수
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const modalChildren = [
    {
      label: "수정",
      onClick: () =>
        router.push({
          pathname: "/community/communityEditForm",
          query: { boardId: boardDetail.boardId },
        }),
    },
    {
      label: "삭제",
      labelColor: "#ff0000",
      onClick: () => setIsConfirmModalOpen(true),
    },
    { label: "취소" },
  ];

  const confirmModalChildren = [
    {
      label: "삭제",
      labelColor: "#ff0000",
      onClick: () => onClickDeleteBoardButton(),
    },
    { label: "취소" },
  ];

  const onClickDeleteBoardButton = () => {
    deleteBoards(boardId as string)
      .then((res) => {
        router.push("/community");
      })
      .catch((err) => console.log(err));
  };

  const handleLikeBoard = () => {
    if (boardDetail.isHeart === 0) {
      const data = {
        heartYn: "Y",
      };
      postLikeBoards(boardId as string, data as object)
        .then((res) => setIsChanged((prev) => !prev))
        .catch((err) => console.log(err));
    } else {
      const data = {
        heartYn: "N",
      };
      postLikeBoards(boardId as string, data as object)
        .then((res) => setIsChanged((prev) => !prev))
        .catch((err) => console.log(err));
    }
  };

  const handleScrapBoard = () => {
    if (boardDetail.isScrap === 0) {
      const data = {
        scrapYn: "Y",
      };
      postScrapBoards(boardId as string, data as object)
        .then((res) => setIsChanged((prev) => !prev))
        .catch((err) => console.log(err));
    } else {
      const data = {
        scrapYn: "N",
      };
      postScrapBoards(boardId as string, data as object)
        .then((res) => setIsChanged((prev) => !prev))
        .catch((err) => console.log(err));
    }
  };

  const onClickImage = () => {
    setZoomImg((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: any) => {
    const data = {
      parentId: null,
      content: comment,
    };
    postComment(boardId as string, data as object).then((res) => {
      setIsChanged((prev) => !prev);
      onReset();
    });
  };

  const onReset = () => {
    setComment("");
  };

  useEffect(() => {
    setCommentList([]);
    const boardId = router.query.boardId;
    if (boardId) {
      getBoardsDetail(boardId as string)
        .then((res) => {
          const { data } = res.data;
          const { imgUrlList } = data;
          setBoardDetail({
            ...data,
            imgUrlList: imgUrlList.map((obj: any) => obj.imgUrl),
            imgInfoList: imgUrlList,
          });
          res.data.data.commentList.map((item: any, idx: string) => {
            if (
              item.deletedYn === "N" ||
              item.list.some((reply: any) => reply.deletedYn === "N")
            ) {
              setCommentList((prev) => [...prev, item]);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [router.query.boardId, isChanged]);

  const goChatModal = () => {
    // 내 게시글일 땐, 채팅하기 안보이게
    if (boardDetail.memberId !== userInfo.memberId) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      {/* 사용자가 게시글 작성자인 경우 구분 */}
      <Header label="" onClickBackButton={() => router.push("/community")} />
      <Container>
        <div>
          <Tag>{boardDetail.categoryName}</Tag>
        </div>
        <Profile>
          <div>
            <Image
              src={
                boardDetail.profileUrl
                  ? boardDetail.profileUrl
                  : defaultProfileImage
              }
              alt={boardDetail.nickname}
              width={60}
              height={60}
              style={{ borderRadius: "50%" }}
              onClick={goChatModal}
            />
            <EditModal
              open={open}
              setOpen={setOpen}
              commentId=""
              isMe={userInfo.memberId === boardDetail.memberId}
              myId={userInfo.memberId}
              otherId={boardDetail.memberId}
            />
            <InfoWrapper>
              <Typography fs="1.6rem" fw="600">
                {boardDetail.nickname}
              </Typography>
              <Typography fs="1.4rem" color="#878B93">
                {boardDetail.createdAt}
              </Typography>
            </InfoWrapper>
          </div>
          {/* 사용자가 게시글 작성자면 */}
          {userInfo.memberId === boardDetail.memberId && (
            <>
              <Icon
                mode="fas"
                icon="ellipsis-vertical"
                size="20px"
                color="#878B93"
                onClick={() => setIsModalOpen(true)}
              />
              {/* 수정 / 삭제 모달 */}
              <ButtonModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                modalChildren={modalChildren}
              />
              {/* 삭제 확인 모달 */}
              <ButtonModal
                open={isConfirmModalOpen}
                setOpen={setIsConfirmModalOpen}
                modalTitle="정말 삭제하시겠습니까?"
                modalChildren={confirmModalChildren}
              />
            </>
          )}
        </Profile>
        <Content>
          <Typography fs="1.6rem" p="0 0 1rem 0">
            {boardDetail.content}
          </Typography>
          {/* image 개수별로 layout 다름*/}
          {boardDetail.imgUrlList ? (
            boardDetail.imgUrlList.length === 1 ? (
              <ImageContainer>
                {boardDetail.imgUrlList?.map((item: string, idx: number) => (
                  <div className="item_1" key={idx} onClick={onClickImage}>
                    <Image src={item} alt="" layout="fill" />
                  </div>
                ))}
              </ImageContainer>
            ) : boardDetail.imgUrlList.length === 2 ? (
              <ImageContainer2>
                {boardDetail.imgUrlList?.map((item: string, idx: number) => (
                  <div className="item" key={idx} onClick={onClickImage}>
                    <Image src={item} alt="" layout="fill" />
                  </div>
                ))}
              </ImageContainer2>
            ) : (
              <ImageContainer3>
                {boardDetail.imgUrlList?.map((item: string, idx: number) => (
                  <div className="item" key={idx} onClick={onClickImage}>
                    <Image src={item} alt="" layout="fill" />
                  </div>
                ))}
              </ImageContainer3>
            )
          ) : (
            <></>
          )}
        </Content>
        <FlexContainer>
          <ButtonContainer>
            <GrayButton onClick={handleLikeBoard}>
              <Icon
                mode={boardDetail.isHeart ? "fas" : "far"}
                icon="heart"
                color={boardDetail.isHeart ? "#FF6767" : "#646464"}
                display="flex"
              />
              좋아요
            </GrayButton>

            <GrayButton onClick={handleScrapBoard}>
              <Icon
                mode={boardDetail.isScrap ? "fas" : "far"}
                icon="bookmark"
                color={boardDetail.isScrap ? "#FFB800" : "#646464"}
                display="flex"
              />
              스크랩
            </GrayButton>
          </ButtonContainer>

          <FlexContainer>
            <Icon
              mode="far"
              icon="comment"
              size="14px"
              color="#878B93"
              display="flex"
            />
            <Typography fs="1.4rem" p="0 0.5rem" color="#4D5158">
              {boardDetail.commentCnt}
            </Typography>
            <Icon
              mode="far"
              icon="heart"
              size="14px"
              color="#878B93"
              display="flex"
            />
            <Typography fs="1.4rem" p="0 0.5rem" color="#4D5158">
              {boardDetail.heartCnt}
            </Typography>
          </FlexContainer>
        </FlexContainer>
      </Container>

      {boardDetail.imgUrlList?.length > 0 && zoomImg ? (
        <ImageModal
          open={zoomImg}
          setOpen={setZoomImg}
          imageList={boardDetail.imgUrlList}
        />
      ) : null}

      <CommentContainer>
        <Typography fs="1.4rem" p="0 0 2rem 0">
          댓글
        </Typography>
        {commentList.length > 0 ? (
          commentList.map((comment: any) => (
            <CommentCard
              key={comment.commentId}
              setCommentList={setCommentList}
              commentList={commentList}
              boardCreatorId={boardDetail.memberId}
              setIsChanged={setIsChanged}
              commentId={comment.commentId}
              memberId={comment.memberId}
              profileUrl={comment.profileUrl}
              nickname={comment.nickname}
              content={comment.content}
              createdAt={comment.createdAt}
              deletedYn={comment.deletedYn}
              list={comment.list}
            />
          ))
        ) : (
          <ColumnContainer>
            <Typography fs="1.6rem" color="#878B93">
              아직 댓글이 없습니다.
            </Typography>
            <Typography fs="1.6rem" color="#878B93">
              가장 먼저 댓글을 남겨보세요.
            </Typography>
          </ColumnContainer>
        )}
      </CommentContainer>

      <InputContainer>
        <Input
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={handleChange}
          onKeyUp={handlePressEnter}
        />
        <IconWrapper>
          <Typography
            fs="1.6rem"
            style={{ lineHeight: "16px" }}
            onClick={handleSubmit}
          >
            등록
          </Typography>
        </IconWrapper>
      </InputContainer>
    </>
  );
}
