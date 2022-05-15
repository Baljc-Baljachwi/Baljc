import styled from "styled-components";
import Image from "next/image";
import { useState, Fragment } from "react";
import Link from "next/link";

import ReplyCard from "./ReplyCard";
import Icon from "../../common/Icon";
import { IComment } from "types";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";
import EditModal from "./EditModal";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";
import { useRouter } from "next/router";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
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

interface CommentCardProps {
  key: string;
  setCommentList: any;
  setIsChanged: any;
  commentList: IComment[];
  // card props
  boardCreatorId: string;
  commentId: string;
  memberId: string;
  profileUrl: string | null;
  nickname: string;
  content: string;
  createdAt: string;
  deletedYn: "Y" | "N";
  list: IComment[];
}

export default function CommentCard({
  key,
  setCommentList,
  setIsChanged,
  commentList,
  boardCreatorId,
  commentId,
  memberId,
  profileUrl,
  nickname,
  content,
  createdAt,
  deletedYn,
  list,
}: CommentCardProps) {
  const [open, setOpen] = useState(false); // 댓글 삭제 확인 모달
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();
  const boardId = router.query.boardId;
  const onClickEdit = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Container>
      <ImageWrapper>
        {deletedYn === "Y" && list !== [] ? (
          <Image src={defaultProfileImage} alt="" width="100%" height="100%" />
        ) : (
          <Image
            src={profileUrl || defaultProfileImage}
            alt=""
            width="100%"
            height="100%"
          />
        )}
      </ImageWrapper>

      <TextContainer>
        <FlexContainer style={{ justifyContent: "space-between" }}>
          <FlexContainer>
            <Typography fs="1.6rem" fw="600">
              {deletedYn === "Y" && list !== [] ? "" : nickname}
            </Typography>
            {/* 작성자인 경우만 */}
            {memberId === boardCreatorId && deletedYn === "N" && list !== [] && (
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
          {memberId === userInfo.memberId && deletedYn === "N" && (
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
                setIsChanged={setIsChanged}
                open={open}
                setOpen={setOpen}
                commentId={commentId}
              />
            </>
          )}
        </FlexContainer>

        {deletedYn === "Y" && list !== [] ? (
          <Typography fs="1.4rem" color="#878B93" p="0 0 0.5rem 0">
            삭제된 댓글입니다.
          </Typography>
        ) : (
          <>
            <Typography fs="1.4rem" color="#878B93">
              {createdAt}
            </Typography>
            <Typography fs="1.8rem">{content}</Typography>
          </>
        )}
        <Link
          href={{
            pathname: `/community/detail/${commentId}`,
            query: {
              commentId: commentId,
              boardId: boardId,
              boardCreatorId: boardCreatorId,
            },
          }}
          as={`/community/detail/${commentId}`}
          passHref
        >
          {deletedYn === "N" ? (
            <Typography fs="1.4rem" p="0 0 1rem 0" color="#878B93">
              답글 쓰기
            </Typography>
          ) : (
            ""
          )}
        </Link>
      </TextContainer>
      {list?.map(
        (reply: any) =>
          reply.deletedYn === "N" && (
            <Fragment key={reply.commentId}>
              <div></div> {/* div tag 있어야 됩니당 grid때무네*/}
              <ReplyCard
                reply={reply}
                boardCreatorId={boardCreatorId}
                setIsChanged={setIsChanged}
                commentList={commentList}
                setCommentList={setCommentList}
                commentId={reply.commentId}
              />
            </Fragment>
          )
      )}
    </Container>
  );
}
