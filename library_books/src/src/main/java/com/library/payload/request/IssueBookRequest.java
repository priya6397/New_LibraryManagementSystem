package com.library.payload.request;


import com.library.Utils.Alphanumeric;
import com.library.Utils.DateConstraint;
import com.library.Utils.Numeric;
import jakarta.validation.constraints.FutureOrPresent;
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

//    @Numeric
    private Long userId;

//    @Alphanumeric
    private String aadharNo;

    @DateConstraint
//    @FutureOrPresent(message = "Date cannot be in the past")
    private LocalDate expiryDate;
}
