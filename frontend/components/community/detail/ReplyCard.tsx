import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

import Icon from "../../common/Icon";
import { IComment } from "types";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";
import EditModal from "./EditModal";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding-top: 1.5rem;
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
  margin-bottom: 1rem;
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
  color?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "")};
  color: ${(props) => (props.color ? props.color : "")};
`;

interface ReplyCardProps {
  reply: IComment;
  boardCreatorId: string;
  setIsChanged: any;
  commentList: any;
  setCommentList: any;
  commentId: string;
}

export default function ReplyCard({
  reply,
  boardCreatorId,
  setIsChanged,
  commentList,
  setCommentList,
  commentId,
}: ReplyCardProps) {
  const userInfo = useRecoilValue(userInfoState);
  const [open, setOpen] = useState(false); // 댓글 삭제 확인 모달
  const onClickEdit = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Container>
      <ImageWrapper>
        <Image
          src={reply.profileUrl || defaultProfileImage}
          alt={reply.nickname}
          width="100%"
          height="100%"
        />
      </ImageWrapper>
      <TextContainer>
        <FlexContainer style={{ justifyContent: "space-between" }}>
          <FlexContainer>
            <Typography fs="1.6rem" fw="600">
              {reply.nickname}
            </Typography>
            {/* 작성자인 경우만 */}
            {reply.memberId === boardCreatorId && (
              <>
                <Typography
                  p="0.2rem 0.5rem"
                  style={{
                    backgroundColor: "#EDEDED",
                    borderRadius: "4px",
                    alignSelf: "center",
                  }}
                >
                  작성자
                </Typography>
              </>
            )}
          </FlexContainer>
          {/* 댓글 작성자인 경우만 수정 버튼 */}
          {reply.memberId === userInfo.memberId && reply.deletedYn === "N" && (
            <>
              <Icon
                mode="fas"
                icon="ellipsis-vertical"
                onClick={onClickEdit}
                size="20px"
                color="#c9c9c9"
              />
              <EditModal
                commentList={commentList}
                setCommentList={setCommentList}
                open={open}
                setOpen={setOpen}
                commentId={commentId}
                setIsChanged={setIsChanged}
              />
            </>
          )}
        </FlexContainer>
        <Typography fs="1.4rem" color="#878B93">
          {reply.createdAt}
        </Typography>
        <Typography fs="1.8rem">{reply.content}</Typography>
      </TextContainer>
    </Container>
  );
}
