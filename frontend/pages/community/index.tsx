import styled from "styled-components";
import { useEffect, useState } from "react";

import Header from "components/common/Header";
import CommunityList from "../../components/community/CommunityList";
import { useRouter } from "next/router";

const Container = styled.div`
  padding-bottom: 7rem;
`;

export default function Community() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <div>
      <Header label="커뮤니티" />
      <Container>
        <CommunityList />
      </Container>
    </div>
  );
}

Community.requireAuth = true;
