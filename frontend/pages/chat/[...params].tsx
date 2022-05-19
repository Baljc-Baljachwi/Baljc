import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";

import Header from "components/common/Header";
import ChatRoom from "../../components/chat/ChatRoom";

export default function Chat() {
  const router = useRouter();

  // console.log(router.query.params);
  const roomId = router.query.params?.toString() || "";
  const nickname = router.query.nickname?.toString() || "";
  const profileUrl = router.query.profileUrl?.toString() || "";

  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "";
  console.log(CHAT_URL);
  const socket = io(`${CHAT_URL}`, {
    transports: ['websocket'],
  });
  console.log("connect: " + socket.id);

  // const sockets: { [key: string]: Socket } = {};

  // useCallback(() => {
  //   if (roomId && sockets[roomId]) {
  //     sockets[roomId].disconnect();
  //     console.log("disconnect");
  //     delete sockets[roomId];
  //   }
  // }, [roomId]);
  // if (!sockets[roomId]) {
  //   sockets[roomId] = io(`${CHAT_URL}`, {
  //     transports: ['websocket'],
  //   });
  //   console.log("connect");
  // }

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
      <ChatRoom roomId={roomId} nickname={nickname} profileUrl={profileUrl} socket={socket} />
    </>
  );
}

Chat.requireAuth = true;
