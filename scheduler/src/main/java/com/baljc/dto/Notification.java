package com.baljc.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Notification {
    private String title;
    private String body;
    private String image;

    @Builder
    public Notification(String title, String body, String image) {
        this.title = title;
        this.body = body;
        this.image = image;
    }
}
