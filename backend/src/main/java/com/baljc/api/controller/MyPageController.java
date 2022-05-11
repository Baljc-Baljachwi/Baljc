package com.baljc.api.controller;

import com.baljc.api.dto.BoardDto;
import com.baljc.api.dto.MyPageDto;
import com.baljc.api.service.MyPageService;
import com.baljc.common.response.BaseDataResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/mypages")
public class MyPageController {

    private final MyPageService myPageService;

    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    @GetMapping("/now-exp")
    public ResponseEntity<BaseDataResponse<MyPageDto.NowExpResponse>> getNowExpenditure(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {

        return ResponseEntity.status(HttpStatus.OK).body(
                new BaseDataResponse<>(1100, "이번 달의 남은 예산/하루 예산/예상 지출 조회에 성공했습니다.",
                        myPageService.getNowExpenditure(date)));
    }

    @GetMapping("/fixed-exp")
    public ResponseEntity<BaseDataResponse<MyPageDto.FixedExpResponse>> getFixedExpenditure(
            @RequestParam(value = "year") Integer year, @RequestParam(value = "month") Integer month) {

        return ResponseEntity.status(HttpStatus.OK).body(
                new BaseDataResponse<>(1101, "해당 월의 고정 지출/총 지출 조회 조회에 성공했습니다.",
                        myPageService.getFixedExpenditure(year, month)));
    }

    @GetMapping("/fixed-exp/list")
    public ResponseEntity<BaseDataResponse<List<MyPageDto.FixedExpContentResponse>>> getFixedExpenditureList(
            @RequestParam(value = "year") Integer year, @RequestParam(value = "month") Integer month) {

        return ResponseEntity.status(HttpStatus.OK).body(
                new BaseDataResponse<>(1104, "해당 월의 고정 지출 내역 조회에 성공했습니다.",
                        myPageService.getFixedExpenditureList(year, month)));
    }

    @GetMapping("/exp-analysis/category")
    public ResponseEntity<BaseDataResponse<Map<String, Integer>>> getExpenditureByCategory(
            @RequestParam(value = "year") Integer year, @RequestParam(value = "month") Integer month) {

        return ResponseEntity.status(HttpStatus.OK).body(
                new BaseDataResponse<>(1102, "카테고리별 지출 조회에 성공했습니다.",
                        myPageService.getExpenditureByCategory(year, month)));
    }

    @GetMapping("/exp-analysis/daily")
    public ResponseEntity<BaseDataResponse<List<Integer>>> getDailyExpenditure(
            @RequestParam(value = "year") Integer year, @RequestParam(value = "month") Integer month) {

        return ResponseEntity.status(HttpStatus.OK).body(
                new BaseDataResponse<>(1103, "일별 지출 조회에 성공했습니다.",
                        myPageService.getDailyExpenditure(year, month)));
    }

    @GetMapping("/my/boards")
    public ResponseEntity<BaseDataResponse<List<BoardDto.BoardListResponse>>> getMyBoards() {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1105,
                "내가 쓴 게시글 목록 조회에 성공했습니다.", myPageService.getMyBoardList()));
    }

    @GetMapping("/scrap/boards")
    public ResponseEntity<BaseDataResponse<List<BoardDto.BoardListResponse>>> getScrapBoards() {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1106,
        "스크랩한 게시글 목록 조회에 성공했습니다.", myPageService.getScrapBoardList()));
    }
}
