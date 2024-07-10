package com.library.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserResponse {
    private Long id;
    private String fullName;
    private String address;
    private String phoneNo;
    private String email;
    private String confirmationCode;
    private LocalDate createdAt;
}
