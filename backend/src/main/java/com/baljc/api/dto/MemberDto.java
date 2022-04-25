package com.baljc.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberDto {
    @Getter
    @NoArgsConstructor
    public static class SignupRequest {
        private String nickname;
        private String profileUrl;
        private Character salaryType;
        private Integer salary;
        private Integer budget;
    }
}
