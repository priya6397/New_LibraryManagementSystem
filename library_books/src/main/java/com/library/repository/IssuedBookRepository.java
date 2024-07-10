package com.library.repository;

import com.library.model.IssuedBook;
import com.library.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssuedBookRepository extends JpaRepository<IssuedBook,Long> {
    List<IssuedBook> findByUserId(Long userId);

    List<IssuedBook> findByUserAndIsReturnedFalse(User user);
    void deleteAllByUser(User user);
    List<IssuedBook> findByUserAndIsReturnedTrue(User user);
}
