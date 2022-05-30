import { api } from "api";

// 채팅방 생성 API
export const postChatRoom = async (memberId1: string, memberId2: string) => {
  // memberId 가 본인, memberId2가 상대방
  return await api.post(`/api/chat/room`, {
    memberId1: memberId1,
    memberId2: memberId2,
  });
};

// 채팅방 조회 API
export const getChatRoomList = async () => {
  return await api.get(`/api/chat/room`);
};

// 채팅 내용 조회 API
export const getChatList = async (roomId: string) => {
  return await api.get(`/api/chat/room/${roomId}`);
};
