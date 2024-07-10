package com.library.service;

import com.library.payload.request.BookRequest;
import com.library.payload.response.BookResponse;

import java.util.List;

public interface BookService {
    BookResponse createBook(BookRequest bookRequest);
    BookResponse getBookById(Long id);
    List<BookResponse> getAllBooks();
    BookResponse updateBook(Long id, BookRequest bookRequest);
    void deleteBook(Long id);


}
