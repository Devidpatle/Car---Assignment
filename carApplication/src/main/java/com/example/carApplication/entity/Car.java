package com.example.carApplication.entity;
import jakarta.persistence.*;
import java.util.List;
@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String make; // The make of the car (e.g., Honda, BMW)
    private String model; // The model of the car (e.g., City, Sedans)
    private int year; // The manufacturing year of the car
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "engine_id", referencedColumnName = "id")
    private Engine engine; // The engine associated with the car
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "car_id") // Foreign key in the tyre table
    private List<Tyre> tyres; // Aggregation Relationship
    public Car(){} // Default constructor

    public Car(String make, String model, int year, Engine engine, List<Tyre> tyres) { // Parameterized constructor
        this.make = make;
        this.model = model;
        this.year = year;
        this.engine = engine;
        this.tyres = tyres;
    }
    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getMake() {
        return make;
    }
    public void setMake(String make) {
        this.make = make;
    }
    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public Engine getEngine() {
        return engine;
    }
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
    public List<Tyre> getTyres() {return tyres;}
    public void setTyres(List<Tyre> tyres) {this.tyres = tyres;}
}
