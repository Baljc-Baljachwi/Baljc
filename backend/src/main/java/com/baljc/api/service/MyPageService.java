package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;
import com.baljc.api.dto.MyPageDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface MyPageService {
    MyPageDto.NowExpResponse getNowExpenditure(LocalDate date);
    MyPageDto.FixedExpResponse getFixedExpenditure(Integer year, Integer month);
    List<MyPageDto.FixedExpContentResponse> getFixedExpenditureList(Integer year, Integer month);
    Map<String, Integer> getExpenditureByCategory(Integer year, Integer month);
    List<Integer> getDailyExpenditure(Integer year, Integer month);
    List<BoardDto.BoardListResponse> getMyBoardList();
    List<BoardDto.BoardListResponse> getScrapBoardList();
}
