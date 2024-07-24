package com.library.payload.request;

import com.library.Utils.EmailWithTLD;
import com.library.Utils.Numeric;
import com.library.Utils.StringCharacter;
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
    @StringCharacter
    private String title;

    @NotEmpty(message = "Author Name is required")
    @Size(max = 15, message = "Title must be at most 20 characters")
    @StringCharacter
    private String authorName;

    @NotEmpty(message = "Publisher Name is required")
    @Size(max = 15, message = "Title must be at most 20 characters")
    @StringCharacter
    private String publisherName;

    @NotEmpty(message = "Publisher No. is required")
    @Size(max = 10, message = "Publisher No. should contain 10 digits")
    @Numeric
    private String publisherNo;

    @NotEmpty(message = "Publisher Email is required")
    @EmailWithTLD
    private String publisherEmail;

    @NotEmpty(message = "Book Type is required")
    @Size(max = 10, message = "Title must be at most 20 characters")
    @StringCharacter
    private String bookType;

    @NotNull(message = "Quantity cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private BigDecimal price;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be greater than 0 and cannot be null")
    private int quantity;

    private String aadharNo;

    private Long libraryId;
    private Long CityId;
}
