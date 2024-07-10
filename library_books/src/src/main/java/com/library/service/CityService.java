package com.library.service;

import com.library.payload.request.CityRequest;
import com.library.payload.response.CityResponse;

import java.util.List;

public interface CityService {
    CityResponse createCity(CityRequest cityRequest);
    CityResponse getCityById(Long id);
    List<CityResponse> getAllCities();
    CityResponse updateCity(Long id, CityRequest cityRequest);
    void deleteCity(Long id);

}
