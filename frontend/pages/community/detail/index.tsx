import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

import Header from "../../../components/common/Header";
import Icon from "../../../components/common/Icon";
import Avatar from "../../../public/assets/img/mypage/avatar/avartar_h.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
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

export default function CommunityDetail() {
  const router = useRouter();

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
          <Typography fs="1.6rem" p="0 0 1rem 0">
            주말에 멍멍이 산책 도와주실 분 있나요? 하루라도 편하게 늦잠 자는 게
            소원이에요 ㅠㅠ{" "}
          </Typography>
          {/* image 있으면 */}
          <Image src={Avatar} width={150} height={150} alt="" />
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
            <Icon mode="fas" icon="comment" size="10px" />
            <Typography p="0 0.5rem">1</Typography>
            <Icon mode="fas" icon="heart" size="10px" />
            <Typography p="0 0.5rem">1</Typography>
          </FlexContainer>
        </FlexContainer>
      </Container>
    </>
  );
}
