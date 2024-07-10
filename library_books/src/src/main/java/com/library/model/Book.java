package com.library.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String authorName;
    private String publisherName;
    private String publisherNo;
    private String publisherEmail;
    private String bookType;
    private BigDecimal price;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "library_id")
    private Library library;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private Long updatedBy;
}
