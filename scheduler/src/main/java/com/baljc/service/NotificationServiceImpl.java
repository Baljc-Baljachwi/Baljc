package com.baljc.service;

import com.baljc.dto.FirebaseCredential;
import com.baljc.dto.Notification;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {

    private final FirebaseCredential firebaseCredential;
    private final String scope;
    private final int MAX_REGISTRATION_TOKENS = 500;

    public NotificationServiceImpl(
            @Value("${firebase.credential.type}") String type,
            @Value("${firebase.credential.project_id}") String project_id,
            @Value("${firebase.credential.private_key_id}") String private_key_id,
            @Value("${firebase.credential.private_key}") String private_key,
            @Value("${firebase.credential.client_email}") String client_email,
            @Value("${firebase.credential.client_id}") String client_id,
            @Value("${firebase.credential.auth_uri}") String auth_uri,
            @Value("${firebase.credential.token_uri}") String token_uri,
            @Value("${firebase.credential.auth_provider_x509_cert_url}") String auth_provider_x509_cert_url,
            @Value("${firebase.credential.client_x509_cert_url}") String client_x509_cert_url,
            @Value("${firebase.scope}") String scope
    ) {
        this.firebaseCredential = new FirebaseCredential(type, project_id, private_key_id, private_key, client_email,
                client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url);
        this.scope = scope;
    }

    @PostConstruct
    public void init() throws IOException {
        String jsonString = new ObjectMapper().writeValueAsString(firebaseCredential)
                .replaceAll("\\\\n", "\n");
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials
                        .fromStream(IOUtils.toInputStream(jsonString, StandardCharsets.UTF_8))
                        .createScoped(scope))
                .build();
        FirebaseApp.initializeApp(options);
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
            for (String t:tokenList)
                log.debug("sendMessageByTokenList - t: {}", t);

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
                    .setWebpushConfig(WebpushConfig.builder()
                            .setFcmOptions(WebpushFcmOptions.builder()
                                    .setLink("https://baljc.com/finance")
                                    .build())
                            .build())
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

                log.debug("메시지 전송에 실패한 토큰의 목록: " + failedTokens);
            }
        }
    }
}
