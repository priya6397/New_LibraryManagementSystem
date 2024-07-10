package com.library.service;

import com.library.model.Book;

import java.time.LocalDate;

public interface IssueBookService {

    Book issueBook(Long bookId, Long userId, String confirmationCode, LocalDate expiryDate);
    Book returnBook(Long issuedBookId);
    int getBookQuantity(Long bookId);
}
