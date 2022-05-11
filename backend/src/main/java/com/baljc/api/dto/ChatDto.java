package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

public class ChatDto {
    @Getter
    @AllArgsConstructor
    public static class RoomResponse {
        private UUID roomId;
        private String updatedAt;
        private MemberDto.Other other;
    }
}
