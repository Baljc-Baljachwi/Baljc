import styled from "styled-components";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Header from "components/common/Header";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";
import { getComment, postComment } from "api/community";
import { IComment } from "types";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";
import ReplyCard2 from "components/community/detail/ReplyCard2";

const Container = styled.div`
  padding: 2rem;
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
  padding-bottom: 1rem;
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

export default function Reply() {
  const router = useRouter();
  const { commentId, boardId, boardCreatorId } = router.query;
  const userInfo = useRecoilValue(userInfoState);
  const [comment, setComment] = useState<IComment>({} as IComment);

  const [reply, setReply] = useState("");
  const [isChanged, setIsChanged] = useState(false); // 변경 감지할 변수

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e: any) => {
    const data = {
      parentId: commentId,
      content: reply,
    };
    postComment(boardId as string, data as object).then((res) => {
      setIsChanged((prev) => !prev);
      onReset();
    });
  };

  const onReset = () => {
    setReply("");
  };

  useEffect(() => {
    getComment(boardId as string, commentId as string).then((res) => {
      console.log(res.data.data);
      setComment(res.data.data);
    });
  }, [isChanged]);

  return (
    <div>
      <Header
        label="답글 작성"
        icon="plus"
        onClickBackButton={() =>
          router.push({
            pathname: "/community/detail",
            query: { boardId },
          })
        }
      ></Header>
      <Container>
        <ImageWrapper>
          {comment.deletedYn === "Y" && comment.list !== [] ? (
            <Image
              src={defaultProfileImage}
              alt=""
              width="100%"
              height="100%"
            />
          ) : (
            <Image
              src={comment.profileUrl || defaultProfileImage}
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
                {comment.deletedYn === "Y" && comment.list !== []
                  ? ""
                  : comment.nickname}
              </Typography>
              {/* 작성자인 경우만 */}
              {comment.memberId === boardCreatorId &&
                comment.deletedYn === "N" &&
                comment.list !== [] && (
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
          </FlexContainer>
          <Typography fs="1.4rem" color="#3D3D3D">
            {comment.createdAt}
          </Typography>
          <Typography fs="1.8rem">
            {comment.deletedYn === "Y" && comment.list !== []
              ? "삭제된 댓글입니다"
              : comment.content}
          </Typography>
        </TextContainer>
        {comment.list?.map(
          (reply) =>
            reply.deletedYn === "N" && (
              <Fragment key={reply.commentId}>
                <div></div> {/* div tag 있어야 됩니당 grid때무네*/}
                <ReplyCard2
                  reply={reply}
                  boardCreatorId={boardCreatorId as string}
                />
              </Fragment>
            )
        )}
      </Container>
      <InputContainer>
        <Input
          placeholder="답글을 입력해주세요."
          value={reply}
          onChange={handleChange}
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
    </div>
  );
}

Reply.requireAuth = true;
