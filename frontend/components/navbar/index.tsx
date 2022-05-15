import { userInfoState } from "atoms/atoms";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Icon from "../common/Icon";

const Container = styled.nav`
  padding: 1rem;
  background-color: #ffffff;
  border-top: 1px solid #00000014;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  z-index: 10000;
  height: 8rem;
  max-width: 512px;
  margin: auto;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  div {
    color: #3d3d3d;
  }
  .active {
    color: #cdcdcd;
  }
`;

export default function NavBar() {
  const router = useRouter();
  const [rootPathname, setRootPathname] = useState<string>("/");
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    const root = router.pathname.split("/")[1];
    setRootPathname(root);
  }, [router]);

  return (
    <Container>
      <Item
        onClick={() => {
          if (userInfo.regionYn) {
            router.push("/community");
          } else {
            confirm(
              "커뮤니티 이용을 위해서는 위치 정보가 필요합니다!\n마이페이지에서 위치 정보를 수정해주세요."
            );
          }
        }}
      >
        <Icon
          mode="fas"
          icon="comments"
          size="2rem"
          color={rootPathname === "community" ? undefined : "#cdcdcd"}
        />
        <div className={rootPathname === "community" ? "" : "active"}>
          커뮤니티
        </div>
      </Item>
      <Item onClick={() => router.push("/calendar")}>
        <Icon
          mode="fas"
          icon="calendar-days"
          size="2rem"
          color={rootPathname === "calendar" ? undefined : "#cdcdcd"}
        />
        <div className={rootPathname === "calendar" ? "" : "active"}>
          캘린더
        </div>
      </Item>
      <Item onClick={() => router.push("/finance")}>
        <Icon
          mode="fas"
          icon="sack-dollar"
          size="2rem"
          color={rootPathname === "finance" ? undefined : "#cdcdcd"}
        />
        <div className={rootPathname === "finance" ? "" : "active"}>가계부</div>
      </Item>
      <Item onClick={() => router.push("/work")}>
        <Icon
          mode="fas"
          icon="clipboard-check"
          size="2rem"
          color={rootPathname === "work" ? undefined : "#cdcdcd"}
        />
        <div className={rootPathname === "work" ? "" : "active"}>할 일</div>{" "}
      </Item>
      <Item onClick={() => router.push("/mypage")}>
        <Icon
          mode="fas"
          icon="user"
          size="2rem"
          color={rootPathname === "mypage" ? undefined : "#cdcdcd"}
        />
        <div className={rootPathname === "mypage" ? "" : "active"}>
          마이페이지
        </div>
      </Item>
    </Container>
  );
}
