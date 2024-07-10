package com.library.controller;

import com.library.model.Book;
import com.library.payload.request.BookRequest;
import com.library.payload.request.IssueBookRequest;
import com.library.payload.response.BookResponse;
import com.library.service.BookService;
import com.library.service.IssueBookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@Validated
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private IssueBookService issueBookService;

    @PostMapping("/save")
    public ResponseEntity<BookResponse> createBook(@Valid @RequestBody BookRequest bookRequest) {
        BookResponse bookResponse = bookService.createBook(bookRequest);
        return ResponseEntity.ok(bookResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable Long id) {
        BookResponse bookResponse = bookService.getBookById(id);
        return ResponseEntity.ok(bookResponse);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<BookResponse>> getAllBooks() {
        List<BookResponse> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable Long id, @RequestBody BookRequest bookRequest) {
        BookResponse bookResponse = bookService.updateBook(id, bookRequest);
        return ResponseEntity.ok(bookResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/issue")
    public ResponseEntity<Book> issueBook(@Valid @RequestBody IssueBookRequest bookRequest) {
        return new ResponseEntity<>(issueBookService.issueBook(bookRequest.getBookId(), bookRequest.getUserId(), bookRequest.getConfirmationCode(),bookRequest.getExpiryDate()), HttpStatus.OK);
    }

    @PostMapping("/return/{issuedBookId}")
    public ResponseEntity<Book> returnBook(@PathVariable Long issuedBookId) {
        return new ResponseEntity<>(issueBookService.returnBook(issuedBookId), HttpStatus.OK);
    }


    @GetMapping("/quantity/{bookId}")
    public ResponseEntity<Integer> getBookQuantity(@PathVariable Long bookId) {
        return new ResponseEntity<>(issueBookService.getBookQuantity(bookId), HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<BookResponse>> getAllBooks(
            @RequestParam(value = "cityId", required = false) Long cityId,
            @RequestParam(value = "libraryId", required = false) Long libraryId) {
        List<BookResponse> books = bookService.getAllBooks(cityId, libraryId);
        return ResponseEntity.ok(books);
    }
    
}   
