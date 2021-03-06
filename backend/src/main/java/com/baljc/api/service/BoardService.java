package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;
import com.baljc.db.entity.Board;
import com.baljc.db.entity.Comment;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface BoardService {

    List<BoardDto.BoardCategoryResponse> getBoardCategory();
    void insertBoard(BoardDto.BoardRequest boardRequest, List<MultipartFile> files);
    void updateBoard(UUID boardId, BoardDto.BoardUpdateRequest boardUpdateRequest, List<MultipartFile> files);
    void deleteBoard(UUID boardId);
    void insertComment(UUID boardId, BoardDto.CommentRequest commentRequest);
    void deleteComment(UUID commentId);
    void updateHeart(UUID boardId, BoardDto.HeartRequest heartRequest);
    void updateScrap(UUID boardId, BoardDto.ScrapRequest scrapRequest);
    List<BoardDto.BoardListResponse> getBoardList(UUID categoryId, Long index);
    BoardDto.BoardDetailResponse getBoardDetail(UUID boardId);
    BoardDto.BoardDetailCommentResponse getComment(UUID commentId);
}
