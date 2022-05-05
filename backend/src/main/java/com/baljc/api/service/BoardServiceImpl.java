package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;
import com.baljc.db.entity.BoardCategory;
import com.baljc.db.repository.BoardCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class BoardServiceImpl implements BoardService {

    private final BoardCategoryRepository boardCategoryRepository;

    @Override
    public List<BoardDto.BoardCategoryResponse> getBoardCategory() {
        List<BoardCategory> list = boardCategoryRepository.findAll();
        List<BoardDto.BoardCategoryResponse> boardCategoryResponse = list.stream()
                .map(category -> new BoardDto.BoardCategoryResponse(category.getBoardCategoryId(), category.getImgUrl(), category.getName()))
                .collect(Collectors.toList());

        return boardCategoryResponse;
    }
}
