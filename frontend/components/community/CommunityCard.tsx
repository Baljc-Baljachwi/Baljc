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
  display: flex;
  align-items: center;
  width: 6rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  color: #646464;
  padding: 0.1rem 1rem;
  border-radius: 3px;
  height: 2rem;
`;

const Content = styled.div`
  background-color: #ffffff;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
  color?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
  color: ${(props) => (props.color ? props.color : "")};
`;

const ImageContainer = styled.div`
  display: grid;
  padding-bottom: 2rem;
  .item_1 {
    height: 20rem;
    position: relative;
  }
`;

const ImageContainer2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 2rem;
  .item {
    height: 20rem;
    position: relative;
  }
`;

const ImageContainer3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 2rem;
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
  align-items: center;
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
      query: { boardId },
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
          {imgUrlList.length === 1 ? (
            <ImageContainer>
              {imgUrlList?.map((item: string, idx: number) => (
                <div className="item_1" key={idx}>
                  <Image src={item} alt="" layout="fill" />
                </div>
              ))}
            </ImageContainer>
          ) : imgUrlList.length === 2 ? (
            <ImageContainer2>
              {imgUrlList?.map((item: string, idx: number) => (
                <div className="item" key={idx}>
                  <Image src={item} alt="" layout="fill" />
                </div>
              ))}
            </ImageContainer2>
          ) : imgUrlList.length === 3 ? (
            <ImageContainer3>
              {imgUrlList?.map((item: string, idx: number) => (
                <div className="item" key={idx}>
                  <Image src={item} alt="" layout="fill" />
                </div>
              ))}
            </ImageContainer3>
          ) : (
            <></>
          )}
          <FlexContainer>
            <Typography fs="1.2rem" color="#878B93">
              {createdAt} | {creator} | {dong}
            </Typography>
            <FlexContainer>
              <Icon
                mode="far"
                icon="comment"
                size="12px"
                color="#878B93"
                display="flex"
              />
              <Typography fs="1.2rem" p="0 0.5rem" color="#4D5158">
                {commentCnt}
              </Typography>
              <Icon
                mode="far"
                icon="heart"
                size="12px"
                color="#878B93"
                display="flex"
              />
              <Typography fs="1.2rem" p="0 0.5rem" color="#4D5158">
                {heartCnt}
              </Typography>
            </FlexContainer>
          </FlexContainer>
        </Content>
      </CardContent>
    </CardContainer>
  );
}
