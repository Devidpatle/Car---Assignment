package com.example.carApplication.controller;
import com.example.carApplication.entity.Car;
import com.example.carApplication.repository.CarRepository;
import com.example.carApplication.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/cars")
public class CarController {
    @Autowired
    private CarService carService;
    @GetMapping("/getAllCars") // Get all cars
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }
    @GetMapping("/getCarById/{id}") // Get a car by its ID
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        if (car == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(car);
    }
    @PostMapping("/createCar") // Create a new car
    public Car createCar(@RequestBody Car car) {
        return carService.createCar(car);
    }
    @PutMapping("/updateCar/{id}") // Update an existing car
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        Car updatedCar = carService.updateCar(id, carDetails);
        if (updatedCar == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedCar);
    }
    @DeleteMapping("/{id}") // Delete a car by its ID
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
