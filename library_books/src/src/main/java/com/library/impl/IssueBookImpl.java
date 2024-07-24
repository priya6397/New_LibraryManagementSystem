package com.library.impl;

import com.library.exception.BookIssuedException;
import com.library.exception.CustomException;
import com.library.exception.ResourceNotFoundException;
import com.library.model.Book;
import com.library.model.IssuedBook;
import com.library.model.User;
import com.library.repository.BookRepository;
import com.library.repository.IssuedBookRepository;
import com.library.repository.UserRepository;
import com.library.service.IssueBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class IssueBookImpl implements IssueBookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssuedBookRepository issuedBookRepository;

    @Override
    @Transactional
    public Book issueBook(Long bookId, Long userId,String aadharNo, LocalDate expiryDate) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            if (book.getQuantity() > 0) {
                Optional<User> userOptional = userRepository.findById(userId);
                if(userOptional.isPresent()){
                    User user = userOptional.get();
                    if (issuedBookRepository.existsByUserAndBookAndIsReturnedFalse(user, book)) {
                        throw new BookIssuedException("User has already issued this book and has not returned it");
                    }
                    if(!user.getAadharNo().equals(aadharNo)){
                        throw new ResourceNotFoundException("Invalid Aadhar Number.");
                    }
                }
                book.setQuantity(book.getQuantity() - 1);
                bookRepository.save(book);
                IssuedBook issuedBook = new IssuedBook();
                issuedBook.setBook(book);
                issuedBook.setUser(userRepository.findById(userId).orElseThrow(() -> new CustomException("User not found")));
                issuedBook.setIssueDate(LocalDate.now());
                issuedBook.setExpiryDate(expiryDate);
                issuedBookRepository.save(issuedBook);

                return book;
            } else {
                throw new CustomException("No more books available");
            }
        } else {
            throw new CustomException("Book not found");
        }
    }

    @Transactional
    public Book returnBook(Long issuedBookId) {
        Optional<IssuedBook> optionalIssuedBook = issuedBookRepository.findById(issuedBookId);
        if (optionalIssuedBook.isPresent()) {
            IssuedBook issuedBook = optionalIssuedBook.get();
            Book book = issuedBook.getBook();
            book.setQuantity(book.getQuantity() + 1);
            bookRepository.save(book);

            issuedBook.setReturnDate(LocalDate.now());
            issuedBook.setReturned(true);
            issuedBookRepository.save(issuedBook);

            return book;
        } else {
            throw new CustomException("Issued book not found");
        }
    }

    @Transactional
    public int getBookQuantity(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(() -> new CustomException("Book not found")).getQuantity();
    }

    @Transactional
    public List<IssuedBook> getIssuedBooksByUserId(Long userId) {
        List<IssuedBook> issuedBooks = issuedBookRepository.findByUserId(userId);

        for (IssuedBook issuedBook : issuedBooks) {
            if (issuedBook.getReturnDate() != null && issuedBook.getReturnDate().isAfter(issuedBook.getExpiryDate())) {
                long daysLate = ChronoUnit.DAYS.between(issuedBook.getExpiryDate(), issuedBook.getReturnDate());
                BigDecimal fine = BigDecimal.valueOf(daysLate * 20);
                issuedBook.setFine(fine);
            } else {
                issuedBook.setFine(BigDecimal.ZERO);
            }
        }
        return issuedBooks;
    }
}
