package com.library.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaginatedUserResponse {
    private List<UserResponse> users;
    private int currentPage;
    private int totalPages;
    private long totalItems;
}
