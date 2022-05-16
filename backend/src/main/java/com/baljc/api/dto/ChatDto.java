package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

public class ChatDto {
    @Getter
    @NoArgsConstructor
    public static class Request {
        private UUID memberId1;
        private UUID memberId2;
    }

    @Getter
    @AllArgsConstructor
    public static class RoomResponse {
        private UUID roomId;
        private String updatedAt;
        private MemberDto.Other other;
    }
}
