package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {

    List<BoardDto.BoardCategoryResponse> getBoardCategory();
    void insertBoard(BoardDto.BoardRequest boardRequest, List<MultipartFile> files);
}
