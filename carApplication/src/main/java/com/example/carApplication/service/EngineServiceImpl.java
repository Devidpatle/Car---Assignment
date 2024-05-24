package com.example.carApplication.service;
import com.example.carApplication.entity.Engine;
import com.example.carApplication.repository.EngineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EngineServiceImpl implements EngineService{
    @Autowired
    private EngineRepository engineRepository;
    @Override
    public List<Engine> getAllEngines() {
        return engineRepository.findAll();
    }
    @Override
    public Engine getEngineById(Long id) {
        return engineRepository.findById(id).orElse(null);
    }
    @Override
    public Engine createEngine(Engine engine) {
        return engineRepository.save(engine);
    }
    @Override
    public Engine updateEngine(Long id, Engine engineDetails) {
        Engine engine = engineRepository.findById(id).orElse(null);
        if (engine != null) {
            engine.setType(engineDetails.getType());
            engine.setHorsepower(engineDetails.getHorsepower());
            return engineRepository.save(engine);
        }
        return null;
    }
    @Override
    public void deleteEngine(Long id) {
        engineRepository.deleteById(id);
    }
}
