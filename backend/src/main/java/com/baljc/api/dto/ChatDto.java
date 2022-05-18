package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

public class ChatDto {
    @Getter
    @NoArgsConstructor
    public static class RoomRequest {
        private UUID memberId1;
        private UUID memberId2;
    }

    @Getter
    @NoArgsConstructor
    public static class ChatRequest {
        private UUID memberId;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class RoomResponse {
        private UUID roomId;
        private String updatedAt;
        private MemberDto.Other other;
    }

    @Getter
    @AllArgsConstructor
    public static class RoomContentResponse {
        private UUID roomId;
        private String updatedAt;
        private String content;
        private MemberDto.Other other;
    }

    @Getter
    @AllArgsConstructor
    public static class ChatResponse {
        private UUID chatId;
        private UUID memberId;
        private String nickname;
        private String content;
        private String profileUrl;
        private LocalDateTime createdAt;
    }
}
