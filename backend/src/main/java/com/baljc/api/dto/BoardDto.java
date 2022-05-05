package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

public class BoardDto {

    @Getter
    @AllArgsConstructor
    public static class BoardCategoryResponse {
        private UUID boardCategoryId;
        private String imgUrl;
        private String name;
    }
}
