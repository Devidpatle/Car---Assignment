package com.example.carApplication.service;

import com.example.carApplication.entity.Car;
import com.example.carApplication.entity.Engine;
import com.example.carApplication.entity.Tyre;
import com.example.carApplication.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepository carRepository;
    @Override
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
    @Override
    public Car getCarById(Long id) {
        return carRepository.findById(id).orElse(null);
    }
    @Override
    public Car createCar(Car car) {
        return carRepository.save(car);
    }
@Override
public Car updateCar(Long id, Car carDetails) {
    Car existingCar = carRepository.findById(id).orElse(null);
    if (existingCar != null) {
        // Update basic car details
        existingCar.setMake(carDetails.getMake());
        existingCar.setModel(carDetails.getModel());
        existingCar.setYear(carDetails.getYear());
        // Update the engine
        Engine existingEngine = existingCar.getEngine();
        if (existingEngine != null && carDetails.getEngine() != null) {
            existingEngine.setType(carDetails.getEngine().getType());
            existingEngine.setHorsepower(carDetails.getEngine().getHorsepower());
            existingCar.setEngine(existingEngine);
        }
        // Update tyres individually to handle any changes
        List<Tyre> existingTyres = existingCar.getTyres();
        List<Tyre> updatedTyres = carDetails.getTyres();
        if (updatedTyres != null) {
            // Update each tyre
            for (int i = 0; i < existingTyres.size(); i++) {
                Tyre existingTyre = existingTyres.get(i);
                Tyre updatedTyre = updatedTyres.get(i);
                if (existingTyre != null && updatedTyre != null) {
                    existingTyre.setBrand(updatedTyre.getBrand());
                    existingTyre.setPressure(updatedTyre.getPressure());
                    existingTyre.setPosition(updatedTyre.getPosition());
                }
            }
        }
        // Save and return the updated car
        return carRepository.save(existingCar);
    }
    return null; // Return null if the car with the given id is not found
}
    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}
