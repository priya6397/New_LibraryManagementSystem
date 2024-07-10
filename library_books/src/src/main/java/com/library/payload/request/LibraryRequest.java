package com.library.payload.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LibraryRequest {
    @NotEmpty(message = "Library Name is required")
    @Size(max = 15, message = "Name must be at most 15 characters")
//    @Pattern(regexp = "^[a-zA-Z ]{3,}$", message = "Name should not contain digits or special characters or empty spaces")
    private String name;

    @NotEmpty(message = "Address is required")
    @Size(max = 30, message = "Address must be at most 30 characters")
//    @Pattern(regexp = "^[a-zA-Z0-9\\s]*$", message = "Address contains special characters")
    private String address;

    @NotEmpty(message = "Phone No. is required")
//    @Pattern(regexp =  "^\\d{10}$", message = "Check the phone number properly, it must contain 10 nos.")
    private String phoneNo;

    @NotEmpty(message = "Email is required")
//    @Pattern(regexp = "^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$", message = "Check your email properly")
    private String email;

    private Long cityId;
}
