package com.baljc.api.service;

import com.baljc.api.dto.ChatDto;

import java.util.List;
import java.util.UUID;

public interface ChatService {
    ChatDto.RoomResponse insertRoom(ChatDto.RoomRequest roomRequest);
    List<ChatDto.RoomContentResponse> getRoomList();
    List<ChatDto.ChatResponse> getChatList(UUID roomId);
    void insertChat(UUID roomId, ChatDto.ChatRequest chatRequest);
}
