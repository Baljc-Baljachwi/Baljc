import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import all from "../../public/assets/img/community/all.png";
import CommunityCard from "./CommunityCard";
import { getBoardsCategories, getBoardsList } from "api/community";
import { IPost } from "types";

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
  font-weight: "400";
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
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "38383037-3665-3162-6433-356534303833"
  );
  const [idx, setIdx] = useState<number>(0);

  // state
  const [posts, setPosts] = useState<IPost[]>([]);
  // ref
  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>(null);

  // 카테고리 setting
  useEffect(() => {
    getBoardsCategories().then((res) => {
      if (res.data.code === 1700) {
        setBoardCategories(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  }, []);

  // function
  const getInfo = async () => {
    getBoardsList(idx, selectedCategory)
      .then((res) => {
        setPosts((prev) => [...prev, ...res.data.data]); // state에 추가
        console.log("info data add...");
      })
      .catch((err) => console.log(err));
  };

  // IntersectionObserver 설정
  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 관찰하고 있는 entry가 화면에 보여지는 경우
        io.unobserve(entry.target); // entry 관찰 해제
        setIdx((prev) => prev + 1);
        getInfo(); // 데이터 가져오기
      }
    });
  };

  // 게시글
  useEffect(() => {
    setIdx(0);
    setPosts([]);
    getInfo();
  }, [selectedCategory]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [posts]);

  return (
    <Container>
      <Header>
        {boardCategories.map((item) => (
          <FlexColumn
            key={item.boardCategoryId}
            onClick={() => setSelectedCategory(item.boardCategoryId)}
            isSelected={selectedCategory === item.boardCategoryId}
          >
            <Image src={item.imgUrl} alt={item.name} width="40%" height="40%" />
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
        {posts?.map((post: any, idx: number) => {
          if (posts.length - 3 === idx) {
            return (
              <div ref={boxRef} key={post.boardId}>
                <CommunityCard
                  boardId={post.boardId}
                  categoryName={post.categoryName}
                  content={post.content}
                  createdAt={post.createdAt}
                  creator={post.creator}
                  dong={post.dong}
                  imgUrlList={post.imgUrlList}
                  heartCnt={post.heartCnt}
                  commentCnt={post.commentCnt}
                />
              </div>
            );
          } else {
            return (
              <div key={post.boardId}>
                <CommunityCard
                  boardId={post.boardId}
                  categoryName={post.categoryName}
                  content={post.content}
                  createdAt={post.createdAt}
                  creator={post.creator}
                  dong={post.dong}
                  imgUrlList={post.imgUrlList}
                  heartCnt={post.heartCnt}
                  commentCnt={post.commentCnt}
                />
              </div>
            );
          }
        })}
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
