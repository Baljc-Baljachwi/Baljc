package com.baljc.exception;

public class NotExistedAccountBookException extends RuntimeException {
    public NotExistedAccountBookException(String message) { super(message); }
}
