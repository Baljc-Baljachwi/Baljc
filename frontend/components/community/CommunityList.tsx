import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

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
  const [isChanged, setIsChanged] = useState<boolean>(false);
  // state
  const [posts, setPosts] = useState<IPost[]>([]);
  const [lastPost, setLastPost] = useState<HTMLDivElement | null>(null);

  // 카테고리 setting
  useEffect(() => {
    getBoardsCategories()
      .then((res) => {
        setBoardCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // API호출하는 함수
  const getInfo = async () => {
    getBoardsList(idx, selectedCategory)
      .then((res) => {
        setPosts(posts.concat(res.data.data)); // state에 추가
      })
      .catch((err) => console.log(err));
  };

  // IntersectionObserver 설정
  const onIntersect: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 뷰포트에 마지막 이미지 들어오면
        setIdx((prev) => prev + 20);
        // 현재 타깃을 unobserve
        observer.unobserve(entry.target);
      }
    });
  };
  useEffect(() => {
    console.log("page ? ", idx);
    getInfo();
  }, [idx, isChanged]); // idx 바뀔 때마다 함수 실행

  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer: IntersectionObserver;
    if (lastPost) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(randomImageList 배열의 마지막 아이템)으로 지정
      observer.observe(lastPost);
    }
    return () => observer && observer.disconnect();
  }, [lastPost]);

  // 게시글
  useEffect(() => {
    setIdx(0);
    setPosts([]);
    setIsChanged(!isChanged);
  }, [selectedCategory]);

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
          if (posts.length - 1 === idx) {
            return (
              <div ref={setLastPost} key={post.boardId}>
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
