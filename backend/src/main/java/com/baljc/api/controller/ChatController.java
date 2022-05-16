package com.baljc.api.controller;

import com.baljc.api.dto.ChatDto;
import com.baljc.api.service.ChatService;
import com.baljc.common.response.BaseDataResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/room")
    public ResponseEntity<BaseDataResponse<ChatDto.RoomResponse>> createRoom(
            @RequestBody ChatDto.Request request) {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1800,
                "채팅 방 생성에 성공했습니다.", chatService.insertRoom(request)));
    }

    @GetMapping("/room")
    public ResponseEntity<BaseDataResponse<List<ChatDto.RoomResponse>>> getRooms() {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1801,
                "채팅 방 목록 조회에 성공했습니다.", chatService.getRoomList()));
    }
}
