import styled from "styled-components";

import Header from "components/common/Header";
import CommunityList from "../components/community/CommunityList";

const Container = styled.div`
  padding-bottom: 7rem;
`;

export default function Community() {
  return (
    <div>
      <Header label="커뮤니티" icon="plus" />
      <Container>
        <CommunityList />
      </Container>
    </div>
  );
}

Community.requireAuth = true;
