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
  grid-template-columns: repeat(5, 1fr);
  z-index: 10000;
  height: 5.6rem;
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

  function needNavbar(pathname: string): boolean {
    if (pathname.split("/")[2] === "detail") {
      return false;
    }
    return true;
  }

  return (
    <>
      {needNavbar(router.pathname) ? (
        <Container>
          <Item onClick={() => router.push("/community")}>
            <Icon
              mode="fas"
              icon="comments"
              size="2rem"
              color={router.pathname === "/community" ? undefined : "#cbcbcb"}
            />
            <div className={router.pathname === "/community" ? "" : "active"}>
              커뮤니티
            </div>
          </Item>
          <Item onClick={() => router.push("/finance")}>
            <Icon
              mode="fas"
              icon="sack-dollar"
              size="2rem"
              color={router.pathname === "/finance" ? undefined : "#cdcdcd"}
            />
            <div className={router.pathname === "/finance" ? "" : "active"}>
              가계부
            </div>
          </Item>
          <Item onClick={() => router.push("/calendar")}>
            <Icon
              mode="fas"
              icon="calendar-days"
              size="2rem"
              color={router.pathname === "/calendar" ? undefined : "#cdcdcd"}
            />
            <div className={router.pathname === "/calendar" ? "" : "active"}>
              캘린더
            </div>
          </Item>
          <Item onClick={() => router.push("/work")}>
            <Icon
              mode="fas"
              icon="clipboard-check"
              size="2rem"
              color={router.pathname === "/work" ? undefined : "#cdcdcd"}
            />
            <div className={router.pathname === "/work" ? "" : "active"}>
              할 일
            </div>{" "}
          </Item>
          <Item onClick={() => router.push("/mypage")}>
            <Icon
              mode="fas"
              icon="user"
              size="2rem"
              color={router.pathname === "/mypage" ? undefined : "#cdcdcd"}
            />
            <div className={router.pathname === "/mypage" ? "" : "active"}>
              마이페이지
            </div>
          </Item>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}
