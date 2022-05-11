import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Header from "components/common/Header";
import CommunityCard from "components/community/CommunityCard";

const Clipped = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }

  return (
    <>
      <Header label='스크랩한 글 목록'></Header>
      <Container>
        {/* <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard /> */}
      </Container>
    </>
  );
};

export default Clipped;
Clipped.requireAuth = true;

const Container = styled.div`
  padding-bottom: 7rem;
`;
