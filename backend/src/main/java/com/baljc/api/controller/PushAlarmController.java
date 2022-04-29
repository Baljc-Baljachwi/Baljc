package com.baljc.api.controller;

import com.baljc.api.dto.MemberDto;
import com.baljc.api.dto.PushAlarmDto;
import com.baljc.api.service.PushAlarmService;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/alarms")
public class PushAlarmController {

    private final PushAlarmService pushAlarmService;

    public PushAlarmController(PushAlarmService pushAlarmService) {
        this.pushAlarmService = pushAlarmService;
    }

    @GetMapping
    public ResponseEntity<BaseDataResponse<PushAlarmDto.Response>> getPushAlarm() {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1200,
                "알람설정 조회에 성공하였습니다.", pushAlarmService.getPushAlarm()));
    }

    @PutMapping
    public ResponseEntity<BaseDataResponse<PushAlarmDto.Response>> modifyPushAlarm(@Valid @RequestBody PushAlarmDto.Request request) {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1201,
                "알람설정 변경이 완료되었습니다.", pushAlarmService.updatePushAlarm(request)));
    }
}
