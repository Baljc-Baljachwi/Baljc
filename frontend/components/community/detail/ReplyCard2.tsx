import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

import { IComment } from "types";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";
import EditModal from "./EditModal";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding-top: 1.5rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  border-radius: 50%;
  height: 4.2rem;
  width: 4.2rem;
  margin-left: 0.5rem;
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
}

export default function ReplyCard({ reply, boardCreatorId }: ReplyCardProps) {
  const userInfo = useRecoilValue(userInfoState);
  const [open, setOpen] = useState(false); // 댓글 삭제 확인 모달
  const [chatOpen, setChatOpen] = useState(false); // 프로필 누르면 채팅하기 뜨도록 모달

  const onClickEdit = () => {
    setOpen((prev) => !prev);
  };

  const goChatModal = () => {
    console.log(reply);
    // 내 게시글일 땐, 채팅하기 안보이게
    if (reply.memberId !== userInfo.memberId) {
      setChatOpen((prev) => !prev);
    }
  };

  return (
    <Container>
      <ImageWrapper>
        <Image
          src={reply.profileUrl || defaultProfileImage}
          alt={reply.nickname}
          width="100%"
          height="100%"
          onClick={goChatModal}
        />
        <EditModal
          open={chatOpen}
          setOpen={setChatOpen}
          commentId=""
          isMe={userInfo.memberId === reply.memberId}
          myId={userInfo.memberId}
          otherId={reply.memberId}
        />
      </ImageWrapper>
      <TextContainer>
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
        <Typography fs="1.4rem" color="#878B93">
          {reply.createdAt}
        </Typography>
        <Typography fs="1.8rem">{reply.content}</Typography>
      </TextContainer>
    </Container>
  );
}
