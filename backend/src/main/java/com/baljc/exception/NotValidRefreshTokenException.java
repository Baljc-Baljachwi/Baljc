package com.baljc.exception;

public class NotValidRefreshTokenException extends RuntimeException {
    public NotValidRefreshTokenException(String message) { super(message); }
}
