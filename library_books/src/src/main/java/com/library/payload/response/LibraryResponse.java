package com.library.payload.response;

import com.library.model.City;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LibraryResponse {
    private Long id;
    private String name;
    private String address;
    private String phoneNo;
    private String email;
    private City city;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private Long updatedBy;
}
