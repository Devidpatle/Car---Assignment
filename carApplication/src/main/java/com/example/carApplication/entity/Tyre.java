package com.example.carApplication.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Tyre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brand; // The brand of the tyre (e.g., Michelin, Goodyear)
    private double pressure; // The pressure of the tyre in PSI
    private String position; // New attribute to store tire position (e.g., front-left, front-right)

    public Tyre() {// Default constructor
    }

    public Tyre(String brand, double pressure, String position) {  // Parameterized constructor
        this.brand = brand;
        this.pressure = pressure;
        this.position=position;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public double getPressure() {
        return pressure;
    }
    public void setPressure(double pressure) {
        this.pressure = pressure;
    }
    public String getPosition() {return position;}
    public void setPosition(String position) {this.position = position;}
}
