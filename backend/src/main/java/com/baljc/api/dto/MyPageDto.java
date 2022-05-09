package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

public class MyPageDto {
    @Getter
    @AllArgsConstructor
    public static class NowExpResponse {
        private Integer remainingBudget;
        private Integer dailyExpenditure;
        private Integer estimatedExpenditure;
        private Integer budget;
        private Integer expenditurePercent;
        private Integer remainingBudgetPercent;
    }

    @Getter
    @AllArgsConstructor
    public static class FixedExpResponse {
        private Integer fixedExpenditure;
        private Integer totalExpenditure;
    }

    @Getter
    @AllArgsConstructor
    public static class FixedExpContentResponse {
        private UUID accountbookId;
        private Integer monthlyPeriod;
        private String dayOfWeek;
        private String title;
        private Integer price;
        private String categoryName;
        private String categoryImgUrl;
        private Character paymentMethod;
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
