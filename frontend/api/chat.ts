import { api } from "api";

// 채팅방 생성
export const postChatRoom = async (memberId1: string, memberId2: string) => {
  console.log("memberId1 : ", memberId1);
  console.log("memberId2 : ", memberId2);
  return await api.post(`/api/chat/room`, {
    memberId1: memberId1,
    memberId2: memberId2,
  });
};
