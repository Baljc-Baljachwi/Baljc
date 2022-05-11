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
        private UUID boardImgId;
        private String imgUrl;

        @QueryProjection
        public BoardImgURLDto(UUID boardImgId, String imgUrl) {
            this.boardImgId = boardImgId;
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
    @Setter
    public static class BoardDetailDto {
        private UUID boardId;
        private UUID memberId;
        private String profileUrl;
        private String nickname;
        private String categoryName;
        private String content;
        private LocalDateTime createdAt;
        private Long heartCnt;
        private Long commentCnt;
        private Long isHeart;
        private Long isScrap;

        @QueryProjection
        public BoardDetailDto(UUID boardId, UUID memberId, String profileUrl, String nickname, String categoryName, String content, LocalDateTime createdAt, Long heartCnt, Long commentCnt, Long isHeart, Long isScrap) {
            this.boardId = boardId;
            this.memberId = memberId;
            this.profileUrl = profileUrl;
            this.nickname = nickname;
            this.categoryName = categoryName;
            this.content = content;
            this.createdAt = createdAt;
            this.heartCnt = heartCnt;
            this.commentCnt = commentCnt;
            this.isHeart = isHeart;
            this.isScrap = isScrap;
        }
    }

    @Getter
    @Setter
    public static class CommentListDto {
        private UUID commentId;
        private UUID memberId;
        private String profileUrl;
        private String nickname;
        private String content;
        private LocalDateTime createdAt;
        private UUID parentId;
        private Character deletedYn;

        @QueryProjection
        public CommentListDto(UUID commentId, UUID memberId, String profileUrl, String nickname, String content, LocalDateTime createdAt, UUID parentId, Character deletedYn) {
            this.commentId = commentId;
            this.memberId = memberId;
            this.profileUrl = profileUrl;
            this.nickname = nickname;
            this.content = content;
            this.createdAt = createdAt;
            this.parentId = parentId;
            this.deletedYn = deletedYn;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class BoardDetailResponse {
        private UUID boardId;
        private UUID memberId;
        private String profileUrl;
        private String nickname;
        private String categoryName;
        private String content;
        private String createdAt;
        private Long heartCnt;
        private Long commentCnt;
        private Long isHeart;
        private Long isScrap;
        private List<BoardImgURLDto> imgUrlList;
        private List<BoardDetailCommentResponse> commentList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BoardDetailCommentResponse {
        private UUID commentId;
        private UUID memberId;
        private String profileUrl;
        private String nickname;
        private String content;
        private String createdAt;
        private Character deletedYn;
        private List<BoardDetailCommentResponse> list;
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
