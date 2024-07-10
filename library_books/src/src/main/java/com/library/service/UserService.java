package com.library.service;

import com.library.model.User;
import com.library.payload.request.UserRequest;
import com.library.payload.response.UserResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest userRequest);
    UserResponse getUserById(Long id);
    List<UserResponse> getAllUsers();
    Page<User> getAllUsers(int page, int size);
    UserResponse updateUser(Long id, UserRequest userRequest);
    void deleteUser(Long id);

    void checkDeleteUserIssuedBooks(Long id);
}
