import { useEffect, useState } from "react";

import Header from "components/common/Header";
import ChatList from "../../../components/community/chat/ChatList";

export default function Chat() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }

  return (
    <div>
      <Header label="채팅" />
      <ChatList />
    </div>
  );
}

Chat.requireAuth = true;
