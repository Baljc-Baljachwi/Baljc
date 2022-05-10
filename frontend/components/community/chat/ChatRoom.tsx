import styled from "styled-components";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const ChatRoomContainer = styled.div``;

export default function ChatRoom() {
  return (
    <>
      <ChatRoomContainer></ChatRoomContainer>
      <ChatMessage></ChatMessage>
      <ChatInput></ChatInput>
    </>
  );
}
