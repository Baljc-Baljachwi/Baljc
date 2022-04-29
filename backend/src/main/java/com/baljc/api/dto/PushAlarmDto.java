package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class PushAlarmDto {
    @Getter
    @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "가계부 알람여부는 필수입니다.")
        @Pattern(regexp = "^[YN]$", message = "올바른 형식(Y/N)이 아닙니다.")
        private String accountAlarmYn;
        @NotBlank(message = "가계부 알람시간은 필수입니다.")
        @Pattern(regexp = "^([01][0-9]|2[0-3]):([0-5][0-9])$", message = "올바른 형식(HH:mm)이 아닙니다.")
        private String accountAlarmTime;
        @NotBlank(message = "할일 알람여부는 필수입니다.")
        @Pattern(regexp = "^[YN]$", message = "올바른 형식(Y/N)이 아닙니다.")
        private String todoAlarmYn;
        @NotBlank(message = "할일 알람시간은 필수입니다.")
        @Pattern(regexp = "^([01][0-9]|2[0-3]):([0-5][0-9])$", message = "올바른 형식(HH:mm)이 아닙니다.")
        private String todoAlarmTime;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Character accountAlarmYn;
        private String accountAlarmTime;
        private Character todoAlarmYn;
        private String todoAlarmTime;
    }
}
