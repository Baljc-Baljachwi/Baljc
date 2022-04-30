package com.baljc.api.controller;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.CalendarDto;
import com.baljc.api.service.CalendarService;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/calendars")
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/months")
    public ResponseEntity<BaseDataResponse> getCalendarByMonth(@RequestParam(value = "year") int year, @RequestParam(value = "month") int month) {
        CalendarDto.CalendarByMonthResponse response = calendarService.getCalendarByMonth(year, month);
        return ResponseEntity.status(200).body(new BaseDataResponse(1600, "캘린더 월별 조회 성공", response));
    }

    @GetMapping("/days")
    public ResponseEntity<BaseResponse> getCalendarByDay(@RequestParam(value = "year") int year, @RequestParam(value = "month") int month, @RequestParam(value = "day") int day) {
        return ResponseEntity.status(200).body(new BaseResponse(1601, "캘린더 일별 조회 성공"));
    }
}
