package com.library.impl;

import com.library.exception.DuplicateEntryException;
import com.library.exception.ResourceNotFoundException;
import com.library.model.Book;
import com.library.model.City;
import com.library.model.Library;
import com.library.payload.request.LibraryRequest;
import com.library.payload.response.LibraryResponse;
import com.library.repository.BookRepository;
import com.library.repository.CityRepository;
import com.library.repository.LibraryRepository;
import com.library.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibraryServiceImpl implements LibraryService {

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    @Transactional
    public LibraryResponse createLibrary(LibraryRequest libraryRequest) {
        Library library = new Library();
        library.setName(libraryRequest.getName());
        library.setAddress(libraryRequest.getAddress());
        library.setPhoneNo(libraryRequest.getPhoneNo());
        library.setEmail(libraryRequest.getEmail());
        library.setCreatedAt(LocalDate.now());
        City city = cityRepository.findById(libraryRequest.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("City not found"));
        library.setCity(city);

        if (libraryRepository.existsByName(library.getName())) {
            throw new DuplicateEntryException("Library with the same name already exists");
        }

        library = libraryRepository.save(library);
        return mapToLibraryResponse(library);
    }

    @Override
    @Transactional
    public LibraryResponse getLibraryById(Long id) {
        Library library = libraryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToLibraryResponse(library);
    }

    @Override
    @Transactional
    public List<LibraryResponse> getAllLibraries() {
        List<Library> libraries = libraryRepository.findAllByIsActiveOrderByCreatedAtDesc(true);
        return libraries.stream().map(this::mapToLibraryResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LibraryResponse updateLibrary(Long id, LibraryRequest libraryRequest) {
        Library library = libraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Library not found"));

        library.setName(libraryRequest.getName());
        library.setAddress(libraryRequest.getAddress());
        library.setPhoneNo(libraryRequest.getPhoneNo());
        library.setEmail(libraryRequest.getEmail());
        library.setUpdatedAt(LocalDate.now());

        City city = cityRepository.findById(libraryRequest.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("City not found"));
        library.setCity(city);

        library = libraryRepository.save(library);
        return mapToLibraryResponse(library);
    }


    @Override
    @Transactional
    public void deleteLibrary(Long id) {
        Library library = libraryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Library not found"));
        library.setActive(false);
        library.setUpdatedAt(LocalDate.now());
        List<Book> books = bookRepository.findByLibraryId(library.getId());
        libraryRepository.save(library);
        for (Book book : books) {
            book.setActive(false);
            book.setUpdatedAt(LocalDate.now());
            bookRepository.save(book);
        }

    }

    @Override
    @Transactional
    public List<LibraryResponse> getLibrariesByCityId(Long cityId) {
        List<Library> libraries = libraryRepository.findByCityId(cityId);
        return libraries.stream().map(this::mapToLibraryResponse).collect(Collectors.toList());
    }

    @Transactional
        public LibraryResponse mapToLibraryResponse(Library library) {
        LibraryResponse libraryResponse = new LibraryResponse();
        libraryResponse.setId(library.getId());
        libraryResponse.setName(library.getName());
        libraryResponse.setAddress(library.getAddress());
        libraryResponse.setPhoneNo(library.getPhoneNo());
        libraryResponse.setEmail(library.getEmail());
        libraryResponse.setCreatedAt(library.getCreatedAt());
        libraryResponse.setCity(library.getCity());
        return libraryResponse;
    }
}
