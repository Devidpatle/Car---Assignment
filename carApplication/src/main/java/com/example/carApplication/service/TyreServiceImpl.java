package com.example.carApplication.service;
import com.example.carApplication.entity.Tyre;
import com.example.carApplication.repository.TyreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class TyreServiceImpl implements TyreService{
    @Autowired
    private TyreRepository tyreRepository;
    @Override
    public List<Tyre> getAllTyres() {
        return tyreRepository.findAll();
    }
    @Override
    public Tyre getTyreById(Long id) {
        return tyreRepository.findById(id).orElse(null);
    }
    @Override
    public Tyre createTyre(Tyre tyre) {
        return tyreRepository.save(tyre);
    }
    @Override
    public Tyre updateTyre(Long id, Tyre tyreDetails) {
        Tyre tyre = tyreRepository.findById(id).orElse(null);
        if (tyre != null) {
            tyre.setBrand(tyreDetails.getBrand());
            tyre.setPressure(tyreDetails.getPressure());
            return tyreRepository.save(tyre);
        }
        return null;
    }
    @Override
    public void deleteTyre(Long id) {
        tyreRepository.deleteById(id);
    }
}
