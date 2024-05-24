package com.example.carApplication.service;

import com.example.carApplication.entity.Car;
import java.util.List;

public interface CarService {
    List<Car> getAllCars();
    Car getCarById(Long id);
    Car createCar(Car car);
    Car updateCar(Long id, Car carDetails);
    void deleteCar(Long id);
}
