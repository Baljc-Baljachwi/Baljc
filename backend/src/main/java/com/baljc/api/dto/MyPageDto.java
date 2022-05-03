package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MyPageDto {
    @Getter
    @AllArgsConstructor
    public static class NowExpResponse {
        private Integer remainingBudget;
        private Integer dailyExpenditure;
        private Integer estimatedExpenditure;
    }

    @Getter
    @AllArgsConstructor
    public static class FixedExpResponse {
        private Integer fixedExpenditure;
        private Integer totalExpenditure;
    }

//    @Getter
//    @AllArgsConstructor
//    public static class ResponseByCategory {
//        private List<Integer> expenditureCategory;
//    }
//
//    @Getter
//    @AllArgsConstructor
//    public static class ResponseByDay {
//        private List<Integer> dailyExpenditure;
//    }
}
