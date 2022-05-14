package com.baljc.exception;

public class NotExpiredTokenException extends RuntimeException {
    public NotExpiredTokenException(String message) { super(message); }
}
