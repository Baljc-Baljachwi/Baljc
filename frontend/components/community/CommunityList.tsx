import { getBoardsCategories } from "api/community";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";

import all from "../../public/assets/img/community/all.png";
import CommunityCard from "./CommunityCard";

const Container = styled.div`
  background-color: #f4f4f4;
  padding: 1rem 0 0 0;
`;
const Header = styled.div`
  padding: 1rem;
  margin: 0 0 0 0;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const FlexColumn = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
  m?: string;
  isSelected?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  background-color: ${(props) => (props.isSelected ? "#F0F0F0" : "0")};
  margin: ${(props) => (props.m ? props.m : "0")};
  padding: ${(props) => (props.isSelected ? "0.2rem 1rem" : "0.2rem 1rem")};
  border-radius: ${(props) => (props.isSelected ? "5px" : "5px")};
`;

const BodyContainer = styled.div`
  padding: 0 0 1rem 0;
`;

const ChatButtonDiv = styled.div`
  width: 100%;
  position: fixed;
  bottom: 14rem;
  z-index: 1000;
`;

const ChatButton = styled.img`
  width: 7rem;
  position: absolute;
  top: 0;
  right: 2rem;
  cursor: pointer;
`;

interface IBoardCategory {
  boardCategoryId: string;
  imgUrl: string;
  name: string;
}

export default function CommunityList() {
  const router = useRouter();
  const [boardCategories, setBoardCategories] = useState<IBoardCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getBoardsCategories().then((res) => {
      if (res.data.code === 1700) {
        setBoardCategories(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  }, []);

  return (
    <Container>
      <Header>
        {boardCategories.map((item) => (
          <FlexColumn
            key={item.boardCategoryId}
            onClick={() => setSelectedCategory(item.boardCategoryId)}
            isSelected={selectedCategory === item.boardCategoryId}
          >
            <Image src={all} alt="전체보기" width="40%" height="40%" />
            <Typography
              fs="1.2rem"
              m="0.5rem 0 0 0"
              isSelected={selectedCategory === item.boardCategoryId}
            >
              {item.name}
            </Typography>
          </FlexColumn>
        ))}
      </Header>
      <BodyContainer>
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </BodyContainer>
      <ChatButtonDiv>
        <ChatButton
          src="/assets/img/community/chat_icon.png"
          onClick={() =>
            router.push(`/community/chat/`).then(() => window.scrollTo(0, 0))
          }
        ></ChatButton>
      </ChatButtonDiv>
    </Container>
  );
}
