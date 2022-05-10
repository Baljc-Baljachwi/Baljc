import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

import Header from "../../../components/common/Header";
import Icon from "../../../components/common/Icon";
import Avatar from "../../../public/assets/img/mypage/avatar/avartar_h.jpg";
import ImageModal from "../../../components/community/detail/CommunityImageModal";
import CommentCard from "components/community/detail/CommentCard";

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

export default function CommunityDetail() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const imageList = [
    "/assets/img/mypage/avatar/avartar_h.jpg",
    "/assets/img/mypage/avatar/avatar_member4.png",
    "/assets/img/mypage/avatar/avatar_member6.png",
    "/assets/img/mypage/avatar/avatar_member4.png",
  ];
  const onClickImage = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Header
        label="커뮤니티"
        icon="plus"
        onClickRightButton={() => router.push("/community/communityCreateForm")}
      />
      <Container>
        <div>
          <Tag>부탁해요</Tag>
        </div>
        <Profile>
          <Image
            src={Avatar}
            alt=""
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
          />
          <InfoWrapper>
            <Typography fs="1.6rem" fw="600">
              발챙쓰
            </Typography>
            <Typography fs="1.4rem" color="#3D3D3D">
              10분 전
            </Typography>
          </InfoWrapper>
        </Profile>
        <Content>
          <Typography fs="1.8rem" p="0 0 1rem 0">
            주말에 멍멍이 산책 도와주실 분 있나요? 하루라도 편하게 늦잠 자는 게
            소원이에요 ㅠㅠ{" "}
          </Typography>
          {/* image 있으면 */}
          <Image
            src={Avatar}
            width={150}
            height={150}
            alt=""
            onClick={onClickImage}
          />
        </Content>
        <FlexContainer>
          <ButtonContainer>
            <GrayButton>
              <Icon
                mode="far"
                icon="thumbs-up"
                color="#646464"
                display="flex"
              />
              공감
            </GrayButton>

            <GrayButton>
              <Icon mode="far" icon="bookmark" color="#646464" display="flex" />
              스크랩
            </GrayButton>
          </ButtonContainer>

          <FlexContainer>
            <Icon mode="fas" icon="comment" size="14px" />
            <Typography fs="1.4rem" p="0 0.5rem">
              1
            </Typography>
            <Icon mode="fas" icon="heart" size="14px" />
            <Typography fs="1.4rem" p="0 0.5rem">
              1
            </Typography>
          </FlexContainer>
        </FlexContainer>
      </Container>
      {open ? (
        <ImageModal open={open} setOpen={setOpen} imageList={imageList} />
      ) : (
        ""
      )}
      <CommentContainer>
        <Typography fs="1.4rem" p="0 0 2rem 0">
          댓글
        </Typography>
        <CommentCard />
      </CommentContainer>
    </>
  );
}
