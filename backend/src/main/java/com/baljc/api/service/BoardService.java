package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;

import java.util.List;

public interface BoardService {

    List<BoardDto.BoardCategoryResponse> getBoardCategory();
}
