package com.library.controller;

import com.library.impl.IssueBookImpl;
import com.library.model.IssuedBook;
import com.library.model.User;
import com.library.payload.request.UserRequest;
import com.library.payload.response.PaginatedUserResponse;
import com.library.payload.response.UserResponse;
import com.library.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin("*")
@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private IssueBookImpl issuedBookService;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest userRequest) {
        UserResponse userResponse = userService.createUser(userRequest);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse userResponse = userService.getUserById(id);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        UserResponse userResponse = userService.updateUser(id, userRequest);
        return ResponseEntity.ok(userResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.checkDeleteUserIssuedBooks(id);
        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<IssuedBook>> getIssuedBooksByUserId(@PathVariable Long userId) {
        List<IssuedBook> issuedBooks = issuedBookService.getIssuedBooksByUserId(userId);
        return new ResponseEntity<>(issuedBooks, HttpStatus.OK);
    }

    @GetMapping("/pagination")
    public PaginatedUserResponse getAllUsers(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size) {
        Page<User> userPage = userService.getAllUsers(page, size);

        List<UserResponse> users = userPage.stream().map(user -> new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getAddress(),
                user.getPhoneNo(),
                user.getEmail(),
                user.getConfirmationCode(),
                user.getCreatedAt()
        )).collect(Collectors.toList());

        return new PaginatedUserResponse(
                users,
                userPage.getNumber(),
                userPage.getTotalPages(),
                userPage.getTotalElements()
        );
    }

}
