package com.baljc.api.controller;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.BoardDto;
import com.baljc.api.service.BoardService;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import com.baljc.db.entity.Board;
import com.baljc.db.entity.Comment;
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

    @GetMapping
    public ResponseEntity<BaseDataResponse> getBoardList(@RequestParam(value = "category") UUID categoryId, @RequestParam(value = "index") long index) {
        List<BoardDto.BoardListResponse> response = boardService.getBoardList(categoryId, index);
        return ResponseEntity.status(200).body(new BaseDataResponse(1702, "게시글 목록 조회 성공", response));
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<BaseDataResponse> getBoardDetail(@PathVariable("boardId") UUID boardId) {
        BoardDto.BoardDetailResponse response = boardService.getBoardDetail(boardId);
        return ResponseEntity.status(200).body(new BaseDataResponse(1703, "게시글 상세 조회 성공", response));
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<BaseResponse> updateBoard(@PathVariable("boardId") UUID boardId,
                                                    @Valid @RequestPart(value = "boardInfo") BoardDto.BoardUpdateRequest boardUpdateRequest,
                                                    @RequestPart(value = "boardImg", required = false) List<MultipartFile> files) {
        boardService.updateBoard(boardId, boardUpdateRequest, files);
        return ResponseEntity.status(200).body(new BaseResponse(1704, "게시글 수정 성공"));
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<BaseResponse> deleteBoard(@PathVariable("boardId") UUID boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.status(200).body(new BaseResponse(1705, "게시글 삭제 성공"));
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

    @PostMapping("/{boardId}/like")
    public ResponseEntity<BaseResponse> updateHeart(@PathVariable("boardId") UUID boardId, @Valid @RequestBody BoardDto.HeartRequest heartRequest) {
        boardService.updateHeart(boardId, heartRequest);
        return ResponseEntity.status(200).body(new BaseResponse(1708, "좋아요/좋아요 취소 성공"));
    }

    @PostMapping("/{boardId}/scrap")
    public ResponseEntity<BaseResponse> updateScrap(@PathVariable("boardId") UUID boardId, @Valid @RequestBody BoardDto.ScrapRequest scrapRequest) {
        boardService.updateScrap(boardId, scrapRequest);
        return ResponseEntity.status(200).body(new BaseResponse(1709, "스크랩/스크랩 취소 성공"));
    }

    @GetMapping("/{boardId}/comments/{commentId}")
    public ResponseEntity<BaseDataResponse> getComment(@PathVariable("boardId") UUID boardId, @PathVariable("commentId") UUID commentId) {
        BoardDto.BoardDetailCommentResponse response = boardService.getComment(commentId);
        return ResponseEntity.status(200).body(new BaseDataResponse(1710, "댓글 조회 성공", response));
    }

}
