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
import java.util.UUID;

public class AccountBookDto {
    @Getter
    @NoArgsConstructor
    public static class AccountBookRequest {
        private UUID categoryId;
//        @NotBlank(message = "타입은 필수입니다.")
        @Pattern(regexp = "^[EI]$", message = "올바른 타입 형식(E/I)이 아닙니다.")
        private String type;
//        @NotBlank(message = "제목은 필수입니다.")
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
//        @NotBlank(message = "주기유형은 필수입니다.")
        @Pattern(regexp = "^[MWN]$", message = "올바른 주기유형 형식(M/W/N)이 아닙니다.")
        private String periodType;
        private Integer monthlyPeriod;
        private Integer weeklyPeriod;
        private String date;
        private String time;
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
        private Character periodType;
        private Integer monthlyPeriod;
        private Integer weeklyPeriod;
        private LocalDateTime date;

        @QueryProjection
        public AccountBookDetailResponse(UUID accountbookId, UUID categoryId, String categoryName, Character type, String title, Integer price, String memo, Character paymentMethod, Character fixedExpenditureYn, Character fixedIncomeYn, Character periodType, Integer monthlyPeriod, Integer weeklyPeriod, LocalDateTime date) {
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
            this.periodType = periodType;
            this.monthlyPeriod = monthlyPeriod;
            this.weeklyPeriod = weeklyPeriod;
            this.date = date;
        }
    }
}
