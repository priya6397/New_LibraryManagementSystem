package com.library.payload.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookRequest {
    @NotEmpty(message = "Title is required")
    @Size(max = 15, message = "Title must be at most 15 characters")
//    @Pattern(regexp = "^[a-zA-Z ]{3,}$", message = "Title should not contain digits or special characters or empty spaces")
    private String title;

    @NotEmpty(message = "Author Name is required")
    @Size(max = 15, message = "Title must be at most 20 characters")
//    @Pattern(regexp = "^[a-zA-Z ]{3,}$", message = "Name should not contain digits or special characters or empty spaces")
    private String authorName;

    @NotEmpty(message = "Publisher Name is required")
    @Size(max = 15, message = "Title must be at most 20 characters")
//    @Pattern(regexp = "^[a-zA-Z ]{3,}$", message = "Name should not contain digits or special characters or empty spaces")
    private String publisherName;

    @NotEmpty(message = "Publisher No. is required")
//    @Pattern(regexp =  "^\\d{10}$", message = "Check the phone number properly, it must contain 10 nos.")
    private String publisherNo;

    @NotEmpty(message = "Publisher Email is required")
//    @Pattern(regexp = "^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$", message = "Check your email properly")
    private String publisherEmail;

    @NotEmpty(message = "Book Type is required")
    @Size(max = 10, message = "Title must be at most 20 characters")
//    @Pattern(regexp = "^[a-zA-Z ]{3,}$", message = "Book Type should not contain digits or special characters or empty spaces")
    private String bookType;

    @NotNull(message = "Quantity cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private BigDecimal price;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be greater than 0")
    private int quantity;

    private Long libraryId;
}
