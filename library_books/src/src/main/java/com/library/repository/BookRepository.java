package com.library.repository;

import com.library.model.Book;
import com.library.model.City;
import com.library.model.Library;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    boolean existsByTitle(String title);
    List<Book> findAllByOrderByTitleAsc();
    List<Book> findByLibraryCityIdAndLibraryIdAndIsActive(Long cityId, Long libraryId, Boolean isActive);
    List<Book> findByLibraryCityIdAndIsActive(Long cityId, Boolean isActive);
    List<Book> findByLibraryIdAndIsActive(Long libraryId, Boolean isActive);
    boolean existsByLibrary(Library library);
    List<Book> findByIsActive(boolean b);

    List<Book> findByLibraryId(Long id);
}
