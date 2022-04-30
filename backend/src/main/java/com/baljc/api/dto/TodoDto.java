package com.baljc.api.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TodoDto {

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
