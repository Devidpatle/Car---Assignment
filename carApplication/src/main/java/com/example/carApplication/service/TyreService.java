package com.example.carApplication.service;

import com.example.carApplication.entity.Tyre;

import java.util.List;

public interface TyreService {
    List<Tyre> getAllTyres();
    Tyre getTyreById(Long id);
    Tyre createTyre(Tyre tyre);
    Tyre updateTyre(Long id, Tyre tyreDetails);
    void deleteTyre(Long id);

}
