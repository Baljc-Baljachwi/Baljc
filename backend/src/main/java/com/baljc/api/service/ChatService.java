package com.baljc.api.service;

import com.baljc.api.dto.ChatDto;

import java.util.List;
import java.util.UUID;

public interface ChatService {
    ChatDto.RoomResponse insertRoom(ChatDto.Request request);
    List<ChatDto.RoomContentResponse> getRoomList();
    List<ChatDto.ChatResponse> getChatList(UUID roomId);
}
