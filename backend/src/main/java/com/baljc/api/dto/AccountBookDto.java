package com.baljc.api.dto;

import com.baljc.common.util.BooleanToYNConverter;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Convert;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

public class AccountBookDto {
    @Getter
    @NoArgsConstructor
    public static class AccountBookRequest {
        private UUID categoryId;
        @Pattern(regexp = "^[EI]$", message = "올바른 타입 형식(E/I)이 아닙니다.")
        private String type;
        @Size(min = 1, max = 18, message = "올바른 제목 형식(1자이상 18자이하)이 아닙니다.")
        private String title;
        @PositiveOrZero(message = "올바른 금액의 범위(0이상 2147483647이하)이 아닙니다.")
        @Max(value = Integer.MAX_VALUE, message = "올바른 금액의 범위(0이상 2147483647이하)이 아닙니다.")
        private Integer price;
        @Size(max = 100, message = "올바른 메모 형식(100자이하)이 아닙니다.")
        private String memo;
        @Pattern(regexp = "^[MCEN]$", message = "올바른 결제수단 형식(M/C/E/N)이 아닙니다.")
        private String paymentMethod;
        @Pattern(regexp = "^[YN]$", message = "올바른 고정지출여부 형식(Y/N)이 아닙니다.")
        private String fixedExpenditureYn;
        @Pattern(regexp = "^[YN]$", message = "올바른 고정지출여부 형식(Y/N)이 아닙니다.")
        private String fixedIncomeYn;
        private Integer monthlyPeriod;
        private LocalDate date;
        private LocalTime time;
        private LocalDate startDate;
        private LocalDate endDate;
    }

    @Getter
    @AllArgsConstructor
    public static class AccountBookCategoryResponse {
        private UUID categoryId;
        private String type;
        private String name;
        private String imgUrl;
    }

    @Getter
    @Setter
    public static class AccountBookDetailResponse {
        private UUID accountbookId;
        private UUID categoryId;
        private String categoryName;
        private Character type;
        private String title;
        private Integer price;
        private String memo;
        private Character paymentMethod;
        private Character fixedExpenditureYn;
        private Character fixedIncomeYn;
        private Integer monthlyPeriod;
        private LocalDateTime date;
        private LocalDate startDate;
        private LocalDate endDate;

        @QueryProjection
        public AccountBookDetailResponse(UUID accountbookId, UUID categoryId, String categoryName, Character type, String title, Integer price, String memo, Character paymentMethod, Character fixedExpenditureYn, Character fixedIncomeYn, Integer monthlyPeriod, LocalDateTime date, LocalDate startDate, LocalDate endDate) {
            this.accountbookId = accountbookId;
            this.categoryId = categoryId;
            this.categoryName = categoryName;
            this.type = type;
            this.title = title;
            this.price = price;
            this.memo = memo;
            this.paymentMethod = paymentMethod;
            this.fixedExpenditureYn = fixedExpenditureYn;
            this.fixedIncomeYn = fixedIncomeYn;
            this.monthlyPeriod = monthlyPeriod;
            this.date = date;
            this.startDate = startDate;
            this.endDate = endDate;
        }
    }

    @Getter
    @Setter
    public static class AccountBookMonthTotalResponse {
        private Integer expenditure;
        private Integer income;

        @QueryProjection
        public AccountBookMonthTotalResponse(Integer expenditure, Integer income) {
            this.expenditure = expenditure;
            this.income = income;
        }
    }

    @Getter
    @Setter
    public static class AccountBookMonthTotal {
        private Character type;
        private Integer price;

        @QueryProjection
        public AccountBookMonthTotal(Character type, Integer price) {
            this.type = type;
            this.price = price;
        }
    }

    @Getter
    @Setter
    public static class AccountBookMonth {
        private UUID accountbookId;
        private Character type;
        private Integer price;
        private String categoryImgUrl;
        private String categoryName;
        private String title;
        private Character paymentMethod;
        private Integer monthlyPeriod;
        private LocalDateTime date;
        private Character fixedExpenditureYn;
        private Character fixedIncomeYn;
        private String dayOfWeek;

        @QueryProjection
        public AccountBookMonth(UUID accountbookId, Character type, Integer price, String categoryImgUrl, String categoryName, String title, Character paymentMethod, Integer monthlyPeriod, LocalDateTime date, Character fixedExpenditureYn, Character fixedIncomeYn) {
            this.accountbookId = accountbookId;
            this.type = type;
            this.price = price;
            this.categoryImgUrl = categoryImgUrl;
            this.categoryName = categoryName;
            this.title = title;
            this.paymentMethod = paymentMethod;
            this.monthlyPeriod = monthlyPeriod;
            this.date = date;
            this.fixedExpenditureYn = fixedExpenditureYn;
            this.fixedIncomeYn = fixedIncomeYn;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class AccountBookList {
        private HashMap<String, Integer> monthTotal;
        private TreeMap<Integer, List<AccountBookMonth>> accountbookMonth;
    }
}
