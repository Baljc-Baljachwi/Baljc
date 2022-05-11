import styled from "styled-components";
import Image from "next/image";
import { useState, Fragment } from "react";

import ReplyCard from "./ReplyCard";
import Icon from "../../common/Icon";
import { IComment } from "types";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";
import EditModal from "./EditModal";

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
  const [open, setOpen] = useState(false); // 댓글 삭제 확인 모달

  const onClickEdit = () => {
    setOpen((prev) => !prev);
  };

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
            <FlexContainer style={{ justifyContent: "space-between" }}>
              <FlexContainer>
                <Typography fs="1.6rem" fw="600">
                  {comment.nickname}
                </Typography>
                {/* 작성자인 경우만 */}
                {comment.memberId === boardCreatorId && (
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

              {/* 작성자인 경우만 수정 버튼 */}
              {comment.memberId === boardCreatorId && (
                <>
                  <Icon
                    mode="fas"
                    icon="ellipsis-vertical"
                    onClick={onClickEdit}
                    size="20px"
                    color="#c9c9c9"
                  />
                  <EditModal
                    open={open}
                    setOpen={setOpen}
                    commentId={comment.commentId}
                  />
                </>
              )}
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
    </Container>
  );
}
