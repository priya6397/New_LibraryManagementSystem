package com.library.payload.response;

import com.library.model.Library;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookResponse {
    private Long id;
    private String title;
    private String authorName;
    private String publisherName;
    private String publisherNo;
    private String publisherEmail;
    private String bookType;
    private BigDecimal price;
    private int quantity;
    private Library library;
    private LocalDate createdAt;
}
