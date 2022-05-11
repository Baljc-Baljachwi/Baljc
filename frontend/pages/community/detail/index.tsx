import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../../../components/common/Header";
import Icon from "../../../components/common/Icon";
import Avatar from "../../../public/assets/img/mypage/avatar/avartar_h.jpg";
import ImageModal from "../../../components/community/detail/CommunityImageModal";
import CommentCard from "components/community/detail/CommentCard";
import { getBoardsDetail } from "api/community";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";
import { IPost, IComment } from "types";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-bottom: 1px solid #e8e8e8;
`;

const Tag = styled.div`
  display: inline;
  font-size: 1rem;
  background-color: #f0f0f0;
  color: #646464;
  padding: 0.1rem 1rem;
  border-radius: 3px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  background-color: #f0f0f0;
  color: #646464;
  padding: 0.8rem 1.6rem;
  border-radius: 5px;
  gap: 0.5rem;
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

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const InputContainer = styled.div`
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 -1px 1px #00000014;
  border: none;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 8fr 1fr;
  z-index: 11000;
  height: 5.6rem;
  margin-bottom: 5.6rem; // 나중에 없애기
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

interface IPostDetail extends IPost {
  memberId: string;
  nickname: string;
  profileUrl: string | null;
  isHeart: 0 | 1;
  isScrap: 0 | 1;
}

export default function CommunityDetail() {
  const router = useRouter();
  const [open, setOpen] = useState(false); // 이미지 확대 모달
  const imageList = [
    "/assets/img/mypage/avatar/avartar_h.jpg",
    "/assets/img/mypage/avatar/avatar_member4.png",
    "/assets/img/mypage/avatar/avatar_member6.png",
  ];
  const [isFocused, setIsFocused] = useState(false); // 댓글 입력창
  const [boardDetail, setBoardDetail] = useState<IPostDetail>(
    {} as IPostDetail
  );
  const [commentList, setCommentList] = useState<IComment[]>([]);

  const onClickImage = () => {
    setOpen((prev) => !prev);
  };

  const HandleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    const boardId = router.query.boardId;
    if (boardId) {
      getBoardsDetail(boardId as string)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1703) {
            console.log(res.data.data);
            setBoardDetail(res.data.data);
            setCommentList(res.data.data.commentList);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [router.query.boardId]);

  return (
    <>
      <Header label="" onClickBackButton={() => router.push("/community")} />
      <Container>
        <div>
          <Tag>{boardDetail.categoryName}</Tag>
        </div>
        <Profile>
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
          />
          <InfoWrapper>
            <Typography fs="1.6rem" fw="600">
              {boardDetail.creator}
            </Typography>
            <Typography fs="1.4rem" color="#3D3D3D">
              {boardDetail.createdAt}
            </Typography>
          </InfoWrapper>
        </Profile>
        <Content>
          <Typography fs="1.8rem" p="0 0 1rem 0">
            {boardDetail.content}
          </Typography>
          {/* image 있으면 */}
          {boardDetail.imgUrlList?.length > 0 && (
            <Image
              src={boardDetail.imgUrlList[0]}
              width={150}
              height={150}
              alt=""
              onClick={onClickImage}
            />
          )}
        </Content>
        <FlexContainer>
          <ButtonContainer>
            <GrayButton>
              <Icon
                mode={boardDetail.isHeart ? "fas" : "far"}
                icon="heart"
                color={boardDetail.isHeart ? "#000000" : "#646464"}
                display="flex"
              />
              좋아요
            </GrayButton>

            <GrayButton>
              <Icon
                mode={boardDetail.isScrap ? "fas" : "far"}
                icon="bookmark"
                color={boardDetail.isScrap ? "#000000" : "#646464"}
                display="flex"
              />
              스크랩
            </GrayButton>
          </ButtonContainer>

          <FlexContainer>
            <Icon mode="fas" icon="comment" size="14px" />
            <Typography fs="1.4rem" p="0 0.5rem">
              {boardDetail.commentCnt}
            </Typography>
            <Icon mode="fas" icon="heart" size="14px" />
            <Typography fs="1.4rem" p="0 0.5rem">
              {boardDetail.heartCnt}
            </Typography>
          </FlexContainer>
        </FlexContainer>
      </Container>

      {boardDetail.imgUrlList?.length > 0 && open ? (
        <ImageModal
          open={open}
          setOpen={setOpen}
          imageList={boardDetail.imgUrlList}
        />
      ) : null}

      <CommentContainer>
        <Typography fs="1.4rem" p="0 0 2rem 0">
          댓글
        </Typography>
        <CommentCard
          commentList={commentList}
          boardCreatorId={boardDetail.memberId}
        />
      </CommentContainer>

      <InputContainer>
        <Input placeholder="댓글을 입력해주세요." onFocus={HandleFocus} />
        <IconWrapper>
          {isFocused ? (
            <Typography fs="1.6rem" style={{ lineHeight: "16px" }}>
              등록
            </Typography>
          ) : (
            <Icon mode="fas" icon="keyboard" size="25px" color="3d3d3d" />
          )}
        </IconWrapper>
      </InputContainer>
    </>
  );
}
