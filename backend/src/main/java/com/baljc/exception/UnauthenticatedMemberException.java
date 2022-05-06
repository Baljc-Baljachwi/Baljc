package com.baljc.exception;

public class UnauthenticatedMemberException extends RuntimeException {
    public UnauthenticatedMemberException(String message) {
        super(message);
    }
}
