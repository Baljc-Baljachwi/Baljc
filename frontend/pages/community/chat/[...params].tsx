import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "components/common/Header";
import ChatRoom from "components/community/chat/ChatRoom";

export default function Chat() {
  const router = useRouter();
  const roomId = router.query.params || [];
  const nickname = router.query.nickname || "";

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <>
      <Header
        label={nickname}
        onClickBackButton={() => router.push("/community/chat")}
      />
      <ChatRoom />
    </>
  );
}

Chat.requireAuth = true;
