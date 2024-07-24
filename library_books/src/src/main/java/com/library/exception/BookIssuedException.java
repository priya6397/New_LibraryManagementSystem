package com.library.exception;

public class BookIssuedException extends RuntimeException{
    public BookIssuedException(String message) {
        super(message);
    }
}
