package com.baljc.api.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;
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
    @Setter
    public static class BoardListDto {
        private UUID boardId;
        private String categoryName;
        private String content;
        private LocalDateTime createdAt;
        private String creator;
        private String dong;
        private Integer heartCnt;
        private Integer commentCnt;
        private Double distance;

//        @QueryProjection
//        public BoardListDto(UUID boardId, String categoryName, String content, LocalDateTime createdAt, String creator, String dong, Long heartCnt, Long commentCnt, Double distance) {
//            this.boardId = boardId;
//            this.categoryName = categoryName;
//            this.content = content;
//            this.createdAt = createdAt;
//            this.creator = creator;
//            this.dong = dong;
//            this.heartCnt = heartCnt;
//            this.commentCnt = commentCnt;
//            this.distance = distance;
//        }
    }

    @Getter
    @Setter
    public static class BoardImgURLDto {
        private String imgUrl;

        @QueryProjection
        public BoardImgURLDto(String imgUrl) {
            this.imgUrl = imgUrl;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class BoardListResponse {
        private UUID boardId;
        private String categoryName;
        private String content;
        private String createdAt;
        private String creator;
        private String dong;
        private List<String> imgUrlList;
        private Integer heartCnt;
        private Integer commentCnt;
    }

    public interface BoardListInterface {
        byte[] getBoardId();
        String getCategoryName();
        String getContent();
        LocalDateTime getCreatedAt();
        String getCreator();
        String getDong();
        Integer getHeartCnt();
        Integer getCommentCnt();
        Double getDistance();
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
