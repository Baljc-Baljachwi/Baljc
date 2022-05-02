package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class CalendarDto {

    @Getter
    @AllArgsConstructor
    public static class CalendarByMonthResponse {
        private HashMap<String, Integer> monthTotal;
        private TreeMap<String, HashMap<String, Integer>> calendarMonth;
    }

    @Getter
    @AllArgsConstructor
    public static class CalendarByDayResponse {
        private Map<String, Integer> dayNumber;
        private Map<String, String> dayString;
        private List<AccountBookDto.AccountBookMonth> accountBookList;
        private List<RoutineDto.Response> routines;
        private List<TodoDto.Response> todos;
    }
}
