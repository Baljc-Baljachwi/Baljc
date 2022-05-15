package com.baljc.service;

import com.baljc.dto.Notification;
import com.google.firebase.messaging.FirebaseMessagingException;

import java.util.List;

public interface NotificationService {
    public void sendMessageByTokenList(List<String> tokenList, Notification notification, String url) throws FirebaseMessagingException;
}
