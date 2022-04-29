package com.baljc.api.service;

import com.baljc.api.dto.PushAlarmDto;

public interface PushAlarmService {
    PushAlarmDto.Response getPushAlarm();
    PushAlarmDto.Response updatePushAlarm(PushAlarmDto.Request request);
}
