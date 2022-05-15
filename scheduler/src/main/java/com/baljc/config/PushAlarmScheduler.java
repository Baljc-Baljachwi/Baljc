package com.baljc.config;

import com.baljc.db.entity.PushAlarm;
import com.baljc.db.repository.PushAlarmRepository;
import com.baljc.dto.Notification;
import com.baljc.service.NotificationService;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@EnableAsync
@Component
public class PushAlarmScheduler {

    private final PushAlarmRepository pushAlarmRepository;
    private final NotificationService notificationService;

    public PushAlarmScheduler(PushAlarmRepository pushAlarmRepository, NotificationService notificationService) {
        this.pushAlarmRepository = pushAlarmRepository;
        this.notificationService = notificationService;
    }

    @Async
    @Scheduled(cron = "0 * * * * *")
    @Transactional(readOnly = true)
    public void scheduleByMinute() throws FirebaseMessagingException {
        LocalTime now = LocalTime.now();
        log.debug("scheduleByMinute - now: {}", now);
        List<PushAlarm> pushAlarmList = pushAlarmRepository.findAll()
                .stream()
                .filter(pushAlarm -> pushAlarm.getMember().getSurveyedYn() == 'Y'
                        && pushAlarm.getMember().getFcmToken() != null)
                .collect(Collectors.toList());

        for (PushAlarm p:pushAlarmList)
            log.debug("scheduleByMinute - p: {}, {}", p.getAccountAlarmTime(), p.getTodoAlarmTime());

        // 가계부 푸시 알람
        List<String> accountFcmTokenList = pushAlarmList
                .stream()
                .filter(pushAlarm -> pushAlarm.getAccountAlarmYn() == 'Y'
                        && pushAlarm.getAccountAlarmTime().getHour() == now.getHour()
                        && pushAlarm.getAccountAlarmTime().getMinute() == now.getMinute())
                .map(pushAlarm -> pushAlarm.getMember().getFcmToken())
                .collect(Collectors.toList());

        notificationService.sendMessageByTokenList(accountFcmTokenList, Notification.builder()
                .title("가계부의 발자취")
                .body("가계부에 오늘의 지출을 기록해 보아요 💸")
                .image("https://baljc.s3.ap-northeast-2.amazonaws.com/512x512.png")
                .build(),
                "https://baljc.com/finance");

        // 할 일 푸시 알람
        List<String> todoFcmTokenList = pushAlarmList
                .stream()
                .filter(pushAlarm -> pushAlarm.getTodoAlarmYn() == 'Y'
                        && pushAlarm.getTodoAlarmTime().getHour() == now.getHour()
                        && pushAlarm.getTodoAlarmTime().getMinute() == now.getMinute())
                .map(pushAlarm -> pushAlarm.getMember().getFcmToken())
                .collect(Collectors.toList());

        notificationService.sendMessageByTokenList(todoFcmTokenList, Notification.builder()
                .title("할 일의 발자취")
                .body("할 일 목록에 오늘의 할 일을 기록해 보아요 🚩")
                .image("https://baljc.s3.ap-northeast-2.amazonaws.com/512x512.png")
                .build(),
                "https://baljc.com/work");
    }
}
