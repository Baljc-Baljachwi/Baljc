package com.baljc.api.controller;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.BoardDto;
import com.baljc.api.service.BoardService;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/boards")
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/categories")
    public ResponseEntity<BaseDataResponse> getBoardCategory() {
        List<BoardDto.BoardCategoryResponse> response = boardService.getBoardCategory();
        return ResponseEntity.status(200).body(new BaseDataResponse(1700, "게시판 카테고리 조회 성공", response));
    }

    @PostMapping
    public ResponseEntity<BaseResponse> insertBoard(@Valid @RequestPart(value = "boardInfo") BoardDto.BoardRequest boardRequest,
                                                    @RequestPart(value = "boardImg", required = false) List<MultipartFile> files) {
        boardService.insertBoard(boardRequest, files);
        return ResponseEntity.status(200).body(new BaseResponse(1701, "게시글 추가 성공"));
    }

    @PostMapping("/{boardId}/comments")
    public ResponseEntity<BaseResponse> insertComment(@PathVariable("boardId") UUID boardId, @Valid @RequestBody BoardDto.CommentRequest commentRequest) {
        boardService.insertComment(boardId, commentRequest);
        return ResponseEntity.status(200).body(new BaseResponse(1706, "댓글 추가 성공"));
    }

    @DeleteMapping("/{boardId}/comments/{commentId}")
    public ResponseEntity<BaseResponse> deleteComment(@PathVariable("boardId") UUID boardId, @PathVariable("commentId") UUID commentId) {
        boardService.deleteComment(commentId);
        return ResponseEntity.status(200).body(new BaseResponse(1707, "댓글 삭제 성공"));
    }
}
