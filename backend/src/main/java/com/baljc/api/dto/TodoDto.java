package com.baljc.api.dto;

import com.querydsl.core.annotations.QueryProjection;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.UUID;

public class TodoDto {
    @Getter
    @NoArgsConstructor
    public static class Request {
        private LocalDate date;
        @NotBlank(message = "내용 입력은 필수입니다.")
        @Size(min = 1, max = 30, message = "내용은 1자이상 30자이하입니다.")
        private String content;
    }

    @Getter
    @NoArgsConstructor
    public static class ContentRequest {
        @NotBlank(message = "내용 입력은 필수입니다.")
        @Size(min = 1, max = 30, message = "내용은 1자이상 30자이하입니다.")
        private String content;
    }

    @Getter
    @NoArgsConstructor
    public static class YnRequest {
        @NotBlank(message = "완료여부 입력은 필수입니다.")
        @Pattern(regexp = "^[YN]$", message = "올바른 형식(Y/N)이 아닙니다.")
        private String completedYn;
    }

//    @Getter
//    @AllArgsConstructor
//    public static class ResponseByDate {
//        private List<RoutineDto.Response> routines;
//        private List<Response> todos;
//    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private UUID todoId;
        private LocalDate date;
        private String content;
        private Character completedYn;
    }

    @Getter
    @Setter
    public static class TodoMonth {
        private LocalDate date;
        private Long count;

        @QueryProjection
        public TodoMonth(LocalDate date, Long count) {
            this.date = date;
            this.count = count;
        }
    }
}
