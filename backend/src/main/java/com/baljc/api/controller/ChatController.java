package com.baljc.api.controller;

import com.baljc.api.dto.ChatDto;
import com.baljc.api.service.ChatService;
import com.baljc.common.response.BaseDataResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/chat/room")
    public ResponseEntity<BaseDataResponse<List<ChatDto.RoomResponse>>> getRooms() {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1800,
                "채팅 방 목록 조회에 성공했습니다.", chatService.getRoomList()));
    }
}
