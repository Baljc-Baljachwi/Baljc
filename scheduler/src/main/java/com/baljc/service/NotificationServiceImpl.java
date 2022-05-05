package com.baljc.service;

import com.baljc.dto.Notification;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {

    @Value("${firebase.key.path}")
    private String FIREBASE_KEY_PATH;

    @Value("${firebase.key.scope}")
    private String FIREBASE_KEY_SCOPE;

    private final int MAX_REGISTRATION_TOKENS = 500;

    @PostConstruct
    public void init() {
        try {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials
                            .fromStream(new FileInputStream(FIREBASE_KEY_PATH))
                            .createScoped(FIREBASE_KEY_SCOPE))
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            log.debug("Firebase private key가 존재하지 않거나 유효하지 않습니다.");
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void sendMessageByTokenList(List<String> tokenList, Notification notification) throws FirebaseMessagingException {
        int N = (int)Math.ceil((double)tokenList.size() / MAX_REGISTRATION_TOKENS);
        int from = 0, to = 0;
        List<String> tokenSubList;
        // 500개의 기기 등록 토큰을 지정하여 FCM 호출
        for (int i = 0; i < N; i++) {
            from = MAX_REGISTRATION_TOKENS * i;
            to = Math.min(from + MAX_REGISTRATION_TOKENS, tokenList.size());
            tokenSubList = new ArrayList<>(tokenList.subList(from, to));

            // 여러 기기에 메시지 전송
            MulticastMessage message = MulticastMessage.builder()
                    .putData("time", LocalDateTime.now().toString())
                    // Notification 설정
                    .setNotification(com.google.firebase.messaging.Notification.builder()
                            .setTitle(notification.getTitle())
                            .setBody(notification.getBody())
                            .setImage(notification.getImage())
                            .build())
                    .addAllTokens(tokenSubList)
                    .build();

            // 메시지 응답 목록
            BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
            if (response.getFailureCount() > 0) {
                List<SendResponse> responses = response.getResponses();
                List<String> failedTokens = new ArrayList<>();
                for (int j = 0; j < responses.size(); j++) {
                    if (!responses.get(i).isSuccessful()) {
                        failedTokens.add(tokenSubList.get(i));
                    }
                }

                System.out.println("메시지 전송에 실패한 토큰의 목록: " + failedTokens);
            }
        }
    }
}
