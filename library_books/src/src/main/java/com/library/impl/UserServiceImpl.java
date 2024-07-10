package com.library.impl;

import com.library.exception.ResourceNotFoundException;
import com.library.model.Book;
import com.library.model.IssuedBook;
import com.library.model.User;
import com.library.payload.request.UserRequest;
import com.library.payload.response.UserResponse;
import com.library.repository.BookRepository;
import com.library.repository.IssuedBookRepository;
import com.library.repository.UserRepository;
import com.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssuedBookRepository issuedBookRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        User user = new User();
        user.setFullName(userRequest.getFullName());
        user.setAddress(userRequest.getAddress());
        user.setPhoneNo(userRequest.getPhoneNo());
        user.setEmail(userRequest.getEmail());
        user.setConfirmationCode(User.generateConfirmationCode());
        user.setActive(true);
        user.setCreatedAt(LocalDate.now());
        user.setUpdatedAt(LocalDate.now());
        user = userRepository.save(user);
        return mapToUserResponse(user);
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToUserResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToUserResponse).collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setFullName(userRequest.getFullName());
        user.setAddress(userRequest.getAddress());
        user.setPhoneNo(userRequest.getPhoneNo());
        user.setEmail(userRequest.getEmail());
        user.setUpdatedAt(LocalDate.now());
        user = userRepository.save(user);
        return mapToUserResponse(user);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }

    private UserResponse mapToUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setFullName(user.getFullName());
        userResponse.setAddress(user.getAddress());
        userResponse.setPhoneNo(user.getPhoneNo());
        userResponse.setEmail(user.getEmail());
        userResponse.setConfirmationCode(user.getConfirmationCode());
        userResponse.setCreatedAt(user.getCreatedAt());
        return userResponse;
    }

//    @Override
//    public void checkDeleteUserIssuedBooks(Long id){
//        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
//        issuedBookRepository.deleteAllByUser(user);
//    }

    @Override
    public void checkDeleteUserIssuedBooks(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<IssuedBook> issuedBooks = issuedBookRepository.findByUserAndIsReturnedFalse(user);

        for (IssuedBook issuedBook : issuedBooks) {
            Book book = issuedBook.getBook();
            book.setQuantity(book.getQuantity() + 1);
            bookRepository.save(book);
        }
        issuedBookRepository.deleteAll(issuedBooks);
    }

    @Override
    public Page<User> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

}
