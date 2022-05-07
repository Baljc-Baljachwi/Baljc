import styled from "styled-components";

import Icon from "../common/Icon";

const CardContainer = styled.div`
  background-color: #f4f4f4;
  padding: 1rem 0 0 0;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem;
`;

const Tag = styled.div`
  display: inline-flex;
  background-color: #f0f0f0;
  color: #646464;
  border-radius: 3px;
  padding: 0 1rem;
`;

const Content = styled.div`
  background-color: #ffffff;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  color?: string;
  p?: string;
  cursor?: string;
}>`
  color: ${(props) => (props.color ? props.color : "")};
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default function CommunityCard() {
  return (
    <CardContainer>
      <CardContent>
        <div>
          <Tag>부탁해요</Tag>
        </div>
        <Content>
          <Typography fs="1.6rem" p="1rem 0">
            주말에 멍멍이 산책 도와주실 분 있나요? 하루라도 편하게 늦잠 자는 게
            소원이에요 ㅠㅠ{" "}
          </Typography>
          <FlexContainer>
            <Typography>1분전 | 발챙쓰 | 천연동</Typography>
            <FlexContainer>
              <Icon mode="fas" icon="comment" size="10px" />
              <Typography p="0 0.5rem">1</Typography>
              <Icon mode="fas" icon="heart" size="10px" />
              <Typography p="0 0.5rem">1</Typography>
            </FlexContainer>
          </FlexContainer>
        </Content>
      </CardContent>
    </CardContainer>
  );
}
