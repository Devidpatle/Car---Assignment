package com.example.carApplication.controller;
import com.example.carApplication.entity.Tyre;
import com.example.carApplication.service.TyreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/tyres")
public class TyreController {
    @Autowired
    private TyreService tyreService;
    @GetMapping // Get all tyres
    public List<Tyre> getAllTyres() {
        return tyreService.getAllTyres();
    }
    @GetMapping("/{id}") // Get a tyre by its ID
    public Tyre getTyreById(@PathVariable Long id) {
        return tyreService.getTyreById(id);
    }
    @PostMapping // Create a new tyre
    public Tyre createTyre(@RequestBody Tyre tyre) {
        return tyreService.createTyre(tyre);
    }
    @PutMapping("/{id}")  // Update an existing tyre
    public Tyre updateTyre(@PathVariable Long id, @RequestBody Tyre tyreDetails) {
        return tyreService.updateTyre(id, tyreDetails);
    }
    @DeleteMapping("/{id}") // Delete a tyre by its ID
    public void deleteTyre(@PathVariable Long id) {
        tyreService.deleteTyre(id);
    }
}
