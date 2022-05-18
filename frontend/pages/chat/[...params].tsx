import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "components/common/Header";
import ChatRoom from "../../components/chat/ChatRoom";

export default function Chat() {
  const router = useRouter();
  const roomId = router.query.roomId?.toString() || "";
  const nickname = router.query.nickname?.toString() || "";
  const profileUrl = router.query.profileUrl?.toString() || "";

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <>
      {/* <Header label={nickname} onClickBackButton={() => router.push("/chat")} /> */}
      <ChatRoom roomId={roomId} nickname={nickname} imgUrl={profileUrl} />
    </>
  );
}

Chat.requireAuth = true;
