package com.baljc.api.service;

import com.baljc.api.dto.PushAlarmDto;
import com.baljc.db.entity.PushAlarm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
public class PushAlarmServiceImpl implements PushAlarmService {

    private final MemberService memberService;

    public PushAlarmServiceImpl(MemberService memberService) {
        this.memberService = memberService;
    }

    @Override
    public PushAlarmDto.Response getPushAlarm() {
        PushAlarm pushAlarm = memberService.getMemberByAuthentication().getPushAlarm();
        return new PushAlarmDto.Response(pushAlarm.getAccountAlarmYn(), pushAlarm.getAccountAlarmTime().toString(),
                pushAlarm.getTodoAlarmYn(), pushAlarm.getAccountAlarmTime().toString());
//        return new PushAlarmDto.Response(pushAlarm.getAccountAlarmYn(), pushAlarm.getAccountAlarmTime().format(DateTimeFormatter.ofPattern("HH:mm")),
//                pushAlarm.getTodoAlarmYn(), pushAlarm.getAccountAlarmTime().format(DateTimeFormatter.ofPattern("HH:mm")));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public PushAlarmDto.Response updatePushAlarm(PushAlarmDto.Request request) {
        PushAlarm pushAlarm = memberService.getMemberByAuthentication().getPushAlarm();
        pushAlarm.updateSetting(request);
        return new PushAlarmDto.Response(pushAlarm.getAccountAlarmYn(), pushAlarm.getAccountAlarmTime().toString(),
                pushAlarm.getTodoAlarmYn(), pushAlarm.getAccountAlarmTime().toString());
    }
}
