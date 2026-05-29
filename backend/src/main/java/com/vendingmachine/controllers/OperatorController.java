package com.vendingmachine.controllers;

import com.vendingmachine.models.OperatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/operators")
@CrossOrigin(origins = "http://localhost:3000")
public class OperatorController {

    @Autowired
    private OperatorRepository operatorRepository;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return operatorRepository.findByUsername(request.getUsername())
                .map(op -> {
                    if (op.getPasswordHash().equals(request.getPassword())) {
                        return "Login successful!";
                    }
                    return "Invalid password!";
                })
                .orElse("Operator not found!");
    }
}