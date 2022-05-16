package com.baljc.api.service;

import com.baljc.api.dto.ChatDto;

import java.util.List;

public interface ChatService {
    ChatDto.RoomResponse insertRoom(ChatDto.Request request);
    List<ChatDto.RoomResponse> getRoomList();
}
