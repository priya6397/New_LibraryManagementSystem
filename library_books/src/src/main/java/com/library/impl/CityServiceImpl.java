package com.library.impl;

import com.library.exception.ResourceNotFoundException;
import com.library.model.City;
import com.library.payload.request.CityRequest;
import com.library.payload.response.CityResponse;
import com.library.repository.CityRepository;
import com.library.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CityServiceImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Override
    public CityResponse createCity(CityRequest cityRequest) {
        City city = new City();
        city.setName(cityRequest.getCityName());
        city.setCreatedAt(LocalDate.now());
        city = cityRepository.save(city);
        return mapToCityResponse(city);
    }

    @Override
    public CityResponse getCityById(Long id) {
        City user = cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City not found"));
        return mapToCityResponse(user);
    }

    @Override
    public List<CityResponse> getAllCities() {
        List<City> users = cityRepository.findAllByOrderByNameAsc();
        return users.stream().map(this::mapToCityResponse).collect(Collectors.toList());
    }

    @Override
    public CityResponse updateCity(Long id, CityRequest cityRequest) {
        City city = cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City not found"));
        city.setName(cityRequest.getCityName());
        city.setUpdatedAt(LocalDate.now());
        city = cityRepository.save(city);
        return mapToCityResponse(city);
    }

    @Override
    public void deleteCity(Long id) {
        City user = cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City not found"));
        cityRepository.delete(user);
    }

    private CityResponse mapToCityResponse(City city) {
        CityResponse cityResponse = new CityResponse();
        cityResponse.setId(city.getId());
        cityResponse.setName(city.getName());
        cityResponse.setCreatedAt(city.getCreatedAt());
        return cityResponse;
    }
}
