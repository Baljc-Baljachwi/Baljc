package com.baljc.api.dto;

import com.baljc.common.util.BooleanToYNConverter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
        @NotBlank(message = "카테고리아이디는 필수입니다.")
        private UUID categoryId;
        @NotBlank(message = "타입은 필수입니다.")
        @Pattern(regexp = "^[EI]$", message = "올바른 타입 형식(E/I)이 아닙니다.")
        private String type;
        @NotBlank(message = "제목은 필수입니다.")
        @Size(min = 1, max = 18, message = "올바른 제목 형식(1자이상 18자이하)이 아닙니다.")
        private String title;
        @PositiveOrZero(message = "올바른 금액의 범위(0이상 2147483647이하)이 아닙니다.")
        @Max(value = Integer.MAX_VALUE, message = "올바른 금액의 범위(0이상 2147483647이하)이 아닙니다.")
        private Integer price;
        @Size(max = 100, message = "올바른 메모 형식(100자이하)이 아닙니다.")
        private String memo;
        private String paymentMethod;
        @NotBlank(message = "고정지출여부는 필수입니다.")
        private Boolean fixedExpenditureYn;
        @NotBlank(message = "고정수입여부는 필수입니다.")
        private Boolean fixedIncomeYn;
        @NotBlank(message = "주기유형은 필수입니다.")
        @Pattern(regexp = "^[MWN]$", message = "올바른 타입 형식(M/W/N)이 아닙니다.")
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
}
