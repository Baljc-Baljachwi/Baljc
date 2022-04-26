import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

const Container = styled.nav`
  padding: 1rem;
  border: 1px solid black;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export default function NavBar() {
  const router = useRouter();
  return (
    <Container>
      <Item onClick={() => router.push("/community")}>
        <Image
          src="/assets/img/community_icon.png"
          alt=""
          width={25}
          height={25}
        />
        <Link href="/community">
          <a>커뮤니티</a>
        </Link>
      </Item>
      <Item onClick={() => router.push("/finance")}>
        <Image
          src="/assets/img/finance_icon.png"
          alt=""
          width={25}
          height={25}
        />
        <Link href="/finance">
          <a>가계부</a>
        </Link>
      </Item>
      <Item onClick={() => router.push("/calendar")}>
        <Image
          src="/assets/img/calendar_icon.png"
          alt=""
          width={25}
          height={25}
        />
        <Link href="/calendar">
          <a>캘린더</a>
        </Link>
      </Item>
      <Item onClick={() => router.push("/work")}>
        <Image src="/assets/img/work_icon.png" alt="" width={25} height={25} />
        <Link href="/work">
          <a>할 일</a>
        </Link>
      </Item>
      <Item onClick={() => router.push("/mypage")}>
        <Image
          src="/assets/img/mypage_icon.png"
          alt=""
          width={25}
          height={25}
        />
        <Link href="/mypage">
          <a>마이페이지</a>
        </Link>
      </Item>
    </Container>
  );
}
