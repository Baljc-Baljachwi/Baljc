package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.util.UUID;

public class BoardDto {

    @Getter
    @NoArgsConstructor
    public static class BoardRequest {
        private UUID categoryId;
        @Size(min = 1, max = 2000, message = "올바른 내용 형식(1자이상 2000자이하)이 아닙니다.")
        private String content;
        private String place;
    }

    @Getter
    @AllArgsConstructor
    public static class BoardCategoryResponse {
        private UUID boardCategoryId;
        private String imgUrl;
        private String name;
    }

    @Getter
    @NoArgsConstructor
    public static class CommentRequest {
        private UUID parentId;
        @Size(min = 1, max = 100, message = "올바른 내용 형식(1자이상 100자이하)이 아닙니다.")
        private String content;
    }

    @Getter
    @NoArgsConstructor
    public static class HeartRequest {
        private String heartYn;
    }

    @Getter
    @NoArgsConstructor
    public static class ScrapRequest {
        private String scrapYn;
    }
}
