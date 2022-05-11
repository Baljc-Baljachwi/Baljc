import styled from "styled-components";
import Image from "next/image";
import { Fragment } from "react";

import Avatar from "../../../public/assets/img/mypage/avatar/avartar_h.jpg";
import ReplyCard from "./ReplyCard";
import { useRouter } from "next/router";
import { IComment } from "types";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const ImageWrapper = styled.div`
  display: flex;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  overflow: hidden;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

interface CommentCardProps {
  commentList: IComment[];
  boardCreatorId: string;
}

export default function CommentCard({
  commentList,
  boardCreatorId,
}: CommentCardProps) {
  return (
    <Container>
      {commentList.map((comment) => (
        <Fragment key={comment.commentId}>
          <ImageWrapper>
            <Image
              src={comment.profileUrl || defaultProfileImage}
              alt=""
              width="100%"
              height="100%"
            />
          </ImageWrapper>

          <TextContainer>
            <FlexContainer>
              <Typography fs="1.6rem" fw="600">
                {comment.nickname}
              </Typography>
            </FlexContainer>
            <Typography fs="1.4rem" color="#3D3D3D">
              {comment.createdAt}
            </Typography>
            <Typography fs="1.8rem">{comment.content}</Typography>
            <Typography fs="1.4rem" p="0 0 1rem 0">
              답글쓰기
            </Typography>
          </TextContainer>
          {comment.list?.map((reply) => (
            <Fragment key={reply.commentId}>
              <div></div> {/* div tag 있어야 됩니당 grid때무네*/}
              <ReplyCard reply={reply} boardCreatorId={boardCreatorId} />
            </Fragment>
          ))}
        </Fragment>
      ))}
      {/* <Fragment>
        <ImageWrapper>
          <Image src={Avatar} alt="" width="100%" height="100%" />
        </ImageWrapper>

        <TextContainer>
          <FlexContainer>
            <Typography fs="1.6rem" fw="600">
              줌줌따리줌줌따리줌줌따리
            </Typography>
          </FlexContainer>
          <Typography fs="1.4rem" color="#3D3D3D">
            4분 전
          </Typography>
          <Typography fs="1.8rem">저 가능해요 ! 채팅 주세요 채팅 😁</Typography>
          <Typography fs="1.4rem" p="0 0 1rem 0">
            답글쓰기
          </Typography>
        </TextContainer>
      </Fragment> */}
      <div></div> {/* div tag 있어야 됩니당 grid때무네*/}
      {/* <ReplyCard /> */}
      <div></div> {/* div tag 있어야 됩니당 grid때무네*/}
      {/* <ReplyCard /> */}
    </Container>
  );
}
