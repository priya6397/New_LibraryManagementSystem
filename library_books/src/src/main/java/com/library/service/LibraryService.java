package com.library.service;

import com.library.payload.request.LibraryRequest;
import com.library.payload.response.LibraryResponse;

import java.util.List;

public interface LibraryService {

    LibraryResponse createLibrary(LibraryRequest libraryRequest);
    LibraryResponse getLibraryById(Long id);
    List<LibraryResponse> getAllLibraries();
    LibraryResponse updateLibrary(Long id, LibraryRequest libraryRequest);
    void deleteLibrary(Long id);
    List<LibraryResponse> getLibrariesByCityId(Long cityId);
}
