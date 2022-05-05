import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Icon from "../common/Icon";

const Container = styled.nav`
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 -1px 1px #00000014;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  z-index: 10000;
  height: 5.6rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  a {
    color: #3d3d3d;
  }
  .active {
    color: #cdcdcd;
  }
`;

export default function NavBar() {
  const router = useRouter();
  return (
    <Container>
      {/* <Item onClick={() => router.push("/community")}>
        <Icon
          mode="fas"
          icon="comments"
          size="2rem"
          color={router.pathname === "/community" ? undefined : "#cbcbcb"}
        />
        <Link href="/community">
          <a className={router.pathname === "/community" ? "" : "active"}>
            커뮤니티
          </a>
        </Link>
      </Item> */}
      <Item onClick={() => router.push("/calendar")}>
        <Icon
          mode="fas"
          icon="calendar-days"
          size="2rem"
          color={router.pathname === "/calendar" ? undefined : "#cdcdcd"}
        />
        <Link href="/calendar">
          <a className={router.pathname === "/calendar" ? "" : "active"}>
            캘린더
          </a>
        </Link>
      </Item>
      <Item onClick={() => router.push("/finance")}>
        <Icon
          mode="fas"
          icon="sack-dollar"
          size="2rem"
          color={router.pathname === "/finance" ? undefined : "#cdcdcd"}
        />
        <Link href="/finance">
          <a className={router.pathname === "/finance" ? "" : "active"}>
            가계부
          </a>
        </Link>
      </Item>
      <Item onClick={() => router.push("/work")}>
        <Icon
          mode="fas"
          icon="clipboard-check"
          size="2rem"
          color={router.pathname === "/work" ? undefined : "#cdcdcd"}
        />
        <Link href="/work">
          <a className={router.pathname === "/work" ? "" : "active"}>할 일</a>
        </Link>
      </Item>
      <Item onClick={() => router.push("/mypage")}>
        <Icon
          mode="fas"
          icon="user"
          size="2rem"
          color={router.pathname === "/mypage" ? undefined : "#cdcdcd"}
        />
        <Link href="/mypage">
          <a className={router.pathname === "/mypage" ? "" : "active"}>
            마이페이지
          </a>
        </Link>
      </Item>
    </Container>
  );
}
