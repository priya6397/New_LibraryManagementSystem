package com.library.impl;

import com.library.exception.DuplicateEntryException;
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
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssuedBookRepository issuedBookRepository;
    @Autowired
    private BookRepository bookRepository;

    @Override
    @Transactional
    public UserResponse createUser(UserRequest userRequest) {
        User user = new User();
        user.setFullName(userRequest.getFullName());
        user.setAddress(userRequest.getAddress());
        user.setPhoneNo(userRequest.getPhoneNo());
        user.setEmail(userRequest.getEmail());
//        user.setConfirmationCode(User.generateConfirmationCode());
        user.setAadharNo(userRequest.getAadharNo());
        user.setActive(true);
        user.setCreatedAt(LocalDate.now());
        user.setUpdatedAt(LocalDate.now());

        if (userRepository.existsByPhoneNo(user.getPhoneNo())) {
            throw new DuplicateEntryException("User with the same phoneno. already exists");
        } else if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateEntryException("User with the same email already exists");
        }

        user = userRepository.save(user);
        return mapToUserResponse(user);
    }

    @Override
    @Transactional
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToUserResponse(user);
    }

    @Override
    @Transactional
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToUserResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setFullName(userRequest.getFullName());
        user.setAddress(userRequest.getAddress());
        user.setPhoneNo(userRequest.getPhoneNo());
        user.setAadharNo(userRequest.getAadharNo());
        user.setEmail(userRequest.getEmail());
        user.setUpdatedAt(LocalDate.now());
        user = userRepository.save(user);
        return mapToUserResponse(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setActive(false);
        userRepository.save(user);
    }

    @Transactional
    public UserResponse mapToUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setFullName(user.getFullName());
        userResponse.setAddress(user.getAddress());
        userResponse.setPhoneNo(user.getPhoneNo());
        userResponse.setEmail(user.getEmail());
//        userResponse.setConfirmationCode(user.getConfirmationCode());
        userResponse.setAadharNo(user.getAadharNo());
        userResponse.setCreatedAt(user.getCreatedAt());
        return userResponse;
    }

//    @Override
//    public void checkDeleteUserIssuedBooks(Long id){
//        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
//        issuedBookRepository.deleteAllByUser(user);
//    }

    @Override
    @Transactional
    public void checkDeleteUserIssuedBooks(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<IssuedBook> issuedBooks = issuedBookRepository.findByUserAndIsReturnedFalse(user);
        List<IssuedBook> issuedBooksReturn = issuedBookRepository.findByUserAndIsReturnedTrue(user);

        for (IssuedBook issuedBook : issuedBooks) {
            Book book = issuedBook.getBook();
            book.setQuantity(book.getQuantity() + 1);
            bookRepository.save(book);
        }
        issuedBookRepository.deleteAll(issuedBooksReturn);
        issuedBookRepository.deleteAll(issuedBooks);
    }

    @Override
    @Transactional
    public Page<User> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return  userRepository.findByIsActive(true, pageable);
    }

//    @Override
//    @Transactional
//    public Page<User> searchUsersByFullName(String fullName, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return userRepository.findByFullNameContaining(fullName, pageable);
//    }

    @Override
    @Transactional
    public Page<User> searchUsersByFullName(String searchQuery, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNoContainingIgnoreCaseOrAddressContainingIgnoreCaseAndIsActive(searchQuery,searchQuery,searchQuery,searchQuery,true,pageable);
    }

}
