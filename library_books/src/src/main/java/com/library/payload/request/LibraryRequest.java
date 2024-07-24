package com.library.payload.request;

import com.library.Utils.Alphanumeric;
import com.library.Utils.EmailWithTLD;
import com.library.Utils.Numeric;
import com.library.Utils.StringCharacter;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LibraryRequest {
    @NotEmpty(message = "Library Name is required")
    @StringCharacter
    private String name;

    @NotEmpty(message = "Address is required")
    @Size(max = 30, message = "Address must be at most 30 characters")
    @Alphanumeric
    private String address;

    @NotEmpty(message = "Phone No. is required")
    @Size(max = 10, message = "Phone No. length should contain 10 digits")
    @Numeric
    private String phoneNo;

    @NotEmpty(message = "Email is required")
    @EmailWithTLD
    private String email;

    private Long cityId;
}
