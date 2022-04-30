package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.TreeMap;

public class CalendarDto {

    @Getter
    @AllArgsConstructor
    public static class CalendarByMonthResponse {
        private HashMap<String, Integer> monthTotal;
        private TreeMap<String, HashMap<String, Integer>> calendarMonth;
    }
}
