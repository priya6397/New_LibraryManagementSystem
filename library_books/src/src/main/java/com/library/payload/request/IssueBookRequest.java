package com.library.payload.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class IssueBookRequest {
    private Long bookId;
    private Long userId;
    private String confirmationCode;
    private LocalDate expiryDate;
}
