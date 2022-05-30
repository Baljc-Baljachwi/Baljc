package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalTime;

public class PushAlarmDto {
    @Getter
    @NoArgsConstructor
    public static class Request {
        @NotBlank(message = "가계부 알람여부는 필수입니다.")
        @Pattern(regexp = "^[YN]$", message = "올바른 형식(Y/N)이 아닙니다.")
        private String accountAlarmYn;
        @NotNull(message = "시간 입력은 필수입니다.")
        private LocalTime accountAlarmTime;
        @NotBlank(message = "할일 알람여부는 필수입니다.")
        @Pattern(regexp = "^[YN]$", message = "올바른 형식(Y/N)이 아닙니다.")
        private String todoAlarmYn;
        @NotNull(message = "시간 입력은 필수입니다.")
        private LocalTime todoAlarmTime;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Character accountAlarmYn;
        private LocalTime accountAlarmTime;
        private Character todoAlarmYn;
        private LocalTime todoAlarmTime;
    }
}
