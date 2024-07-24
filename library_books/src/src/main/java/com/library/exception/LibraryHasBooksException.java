package com.library.exception;

public class LibraryHasBooksException extends RuntimeException{
    public LibraryHasBooksException(String message) {
        super(message);
    }
}
