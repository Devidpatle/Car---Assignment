package com.example.carApplication.service;
import com.example.carApplication.entity.Engine;
import java.util.List;
public interface EngineService {
    List<Engine> getAllEngines();
    Engine getEngineById(Long id);
    Engine createEngine(Engine engine);
    Engine updateEngine(Long id, Engine engineDetails);
    void deleteEngine(Long id);
}
