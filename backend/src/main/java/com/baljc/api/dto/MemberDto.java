package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.util.UUID;

public class MemberDto {
    @Getter
    @NoArgsConstructor
    public static class RegisterRequest {
        @NotBlank(message = "닉네임 입력은 필수입니다.")
        @Pattern(regexp = "^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$", message = "올바른 닉네임 형식(한글/영문/숫자를 포함할 수 있음)이 아닙니다.")
        @Size(min = 2, max = 12, message = "올바른 닉네임 형식(2자이상 12자이하)이 아닙니다.")
        private String nickname;
        @NotNull(message = "프로필 이미지 업데이트 여부는 필수입니다.")
        private Boolean profileUpdated;
        @NotBlank(message = "급여유형 입력은 필수입니다.")
        @Pattern(regexp = "^[MHN]$", message = "올바른 급여유형 형식(M/H/N)이 아닙니다.")
        private String salaryType;
        @PositiveOrZero(message = "올바른 급여의 범위(0이상 2147483647이하)가 아닙니다.")
        @Max(value = Integer.MAX_VALUE, message = "올바른 급여의 범위(0이상 2147483647이하)가 아닙니다.")
        private Integer salary;
        @PositiveOrZero(message = "올바른 주당 근무시간의 범위(0이상 168이하)가 아닙니다.")
        @Max(value = 168, message = "올바른 주당 근무시간의 범위(0이상 168이하)가 아닙니다.")
        private Integer workingHours;
        @NotNull(message = "예산 입력은 필수입니다.")
        @PositiveOrZero(message = "올바른 예산의 범위(0이상 2147483647이하)가 아닙니다.")
        @Max(value = Integer.MAX_VALUE, message = "올바른 예산의 범위(0이상 2147483647이하)가 아닙니다.")
        private Integer budget;
        @Min(value = -90, message = "올바른 위도의 범위(-90이상 90이하)가 아닙니다.")
        @Max(value = 90, message = "올바른 위도의 범위(-90이상 90이하)가 아닙니다.")
        private Double latitude;
        @Min(value = -180, message = "올바른 예산의 범위(-180이상 180이하)가 아닙니다.")
        @Max(value = 180, message = "올바른 예산의 범위(-180이상 180이하)가 아닙니다.")
        private Double longitude;
        private String depth1;
        private String depth2;
        private String depth3;
    }

    @Getter
    @AllArgsConstructor
    public static class SigninInfo {
        private String jwt;
//        private String refreshToken;
        private UUID memberId;
        private Boolean surveyedYn;
        private Boolean regionYn;
    }

    @Getter
    @AllArgsConstructor
    public static class SigninResponse {
        private UUID memberId;
        private Boolean surveyedYn;
        private Boolean regionYn;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private String nickname;
        private String profileUrl;
        private Character salaryType;
        private Integer salary;
        private Integer workingHours;
        private Integer budget;
        private Double latitude;
        private Double longitude;
        private String depth1;
        private String depth2;
        private String depth3;
    }

    @Getter
    @AllArgsConstructor
    public static class Other {
        private String nickname;
        private String profileUrl;
        private String depth1;
        private String depth2;
        private String depth3;
    }
}
