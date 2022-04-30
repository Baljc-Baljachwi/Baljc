package com.baljc.api.service;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.CalendarDto;

public interface CalendarService {

    CalendarDto.CalendarByMonthResponse getCalendarByMonth(int year, int month);
}
