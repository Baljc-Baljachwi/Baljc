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
    void insertComment(UUID boardId, BoardDto.CommentRequest commentRequest);
    void deleteComment(UUID commentId);
    void updateHeart(UUID boardId, BoardDto.HeartRequest heartRequest);
}
