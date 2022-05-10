package com.baljc.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@AllArgsConstructor
public class FirebaseCredential {
    private final String type;
    private final String project_id;
    private final String private_key_id;
    private final String private_key;
    private final String client_email;
    private final String client_id;
    private final String auth_uri;
    private final String token_uri;
    private final String auth_provider_x509_cert_url;
    private final String client_x509_cert_url;
}
