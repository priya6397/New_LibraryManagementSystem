package com.library.payload.request;

import com.library.Utils.Alphanumeric;
import com.library.Utils.EmailWithTLD;
import com.library.Utils.Numeric;
import com.library.Utils.StringCharacter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
public class UserRequest {
    @NotEmpty(message = "Name is required")
    @Size(max = 15, message = "Name must be at most 15 characters")
    @StringCharacter
    private String fullName;

    @NotEmpty(message = "Address is required")
    @Size(max = 30, message = "Address must be at most 30 characters")
    @Alphanumeric
    private String address;

    @NotEmpty(message = "Phone No. is required")
    @Size(max = 10, message = "Phone No. should contain 10 digits")
    @Numeric
    private String phoneNo;

    @NotEmpty(message = "Email is required")
    @EmailWithTLD
    private String email;

    private String aadharNo;
}
