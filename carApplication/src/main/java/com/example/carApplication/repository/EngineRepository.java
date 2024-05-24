package com.example.carApplication.repository;

import com.example.carApplication.entity.Engine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EngineRepository extends JpaRepository<Engine,Long> {
}
