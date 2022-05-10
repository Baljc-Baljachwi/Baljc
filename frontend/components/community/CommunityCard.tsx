import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

import Icon from "../common/Icon";
import { IPost } from "types";

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
  display: inline;
  font-size: 1rem;
  background-color: #f0f0f0;
  color: #646464;
  padding: 0.1rem 1rem;
  border-radius: 3px;
`;

const Content = styled.div`
  background-color: #ffffff;
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

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 1rem;
  .item {
    height: 10rem;
    position: relative;
  }
  .item:nth-child(1) {
    height: 21rem;
    grid-row: 1/3;
    grid-column: 1/2;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function CommunityCard({
  boardId,
  categoryName,
  content,
  createdAt,
  creator,
  dong,
  imgUrlList,
  heartCnt,
  commentCnt,
}: IPost) {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: "/community/detail",
      // query: { boardId },
    });
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardContent>
        <div>
          <Tag>{categoryName}</Tag>
        </div>
        <Content>
          <Typography fs="1.6rem" p="1rem 0">
            {content}
          </Typography>
          <ImageContainer>
            {imgUrlList?.map((item: string, idx: number) => (
              <div className="item" key={idx}>
                <Image src={item} alt="" layout="fill" />
              </div>
            ))}
          </ImageContainer>
          <FlexContainer>
            <Typography>
              {createdAt} | {creator} | {dong}
            </Typography>
            <FlexContainer>
              <Icon mode="fas" icon="comment" size="10px" />
              <Typography p="0 0.5rem">{commentCnt}</Typography>
              <Icon mode="fas" icon="heart" size="10px" />
              <Typography p="0 0.5rem">{heartCnt}</Typography>
            </FlexContainer>
          </FlexContainer>
        </Content>
      </CardContent>
    </CardContainer>
  );
}
