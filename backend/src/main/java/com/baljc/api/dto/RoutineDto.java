package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.util.UUID;

public class RoutineDto {
    @Getter
    @NoArgsConstructor
    public static class Request {
        @NotBlank(message = "제목 입력은 필수입니다.")
        @Size(min = 1, max = 30, message = "제목은 1자이상 30자이하입니다.")
        private String title;
        @Min(value = 1, message = "올바른 범위(1이상 127이하)가 아닙니다.")
        @Max(value = 127, message = "올바른 범위(1이상 127이하)가 아닙니다.")
        private Integer repetition;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private UUID routineId;
        private String title;
        private Integer repetition;
    }
}
