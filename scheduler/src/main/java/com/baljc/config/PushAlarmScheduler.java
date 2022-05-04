package com.baljc.config;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@EnableAsync
@Component
public class PushAlarmScheduler {

    @Async
    @Scheduled(fixedRate = 60000)
    public void scheduleFixedRateTask() throws InterruptedException {
        
    }
}
