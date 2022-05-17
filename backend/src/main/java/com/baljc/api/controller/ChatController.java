package com.baljc.api.controller;

import com.baljc.api.dto.ChatDto;
import com.baljc.api.service.ChatService;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

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
            @RequestBody ChatDto.RoomRequest roomRequest) {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1800,
                "채팅 방 생성 또는 조회에 성공했습니다.", chatService.insertRoom(roomRequest)));
    }

    @GetMapping("/room")
    public ResponseEntity<BaseDataResponse<List<ChatDto.RoomContentResponse>>> getRooms() {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1801,
                "채팅 방 목록 조회에 성공했습니다.", chatService.getRoomList()));
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<BaseDataResponse<List<ChatDto.ChatResponse>>> getChat(@PathVariable("roomId") UUID roomId) {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1802,
                "채팅 내역 조회에 성공했습니다.", chatService.getChatList(roomId)));
    }

    @PostMapping("/room/{roomId}")
    public ResponseEntity<BaseResponse> addChat(
            @PathVariable("roomId") UUID roomId, @RequestBody ChatDto.ChatRequest chatRequest) {
        chatService.insertChat(roomId, chatRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(1803,
                "채팅 추가에 성공했습니다."));
    }
}
