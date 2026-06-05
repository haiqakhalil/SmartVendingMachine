package com.vendingmachine.controllers;

import com.vendingmachine.models.Operator;
import com.vendingmachine.models.OperatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/operators")
@CrossOrigin(origins = "http://localhost:3000")
public class OperatorController {

    @Autowired
    private OperatorRepository operatorRepository;

    // Login
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        Optional<Operator> result = operatorRepository.findByUsername(request.getUsername());

        if (result.isEmpty()) {
            return "Username not found!";
        }

        Operator operator = result.get();

        if (operator.getPassword().equals(request.getPassword())) {
            return "Login successful!";
        } else {
            return "Wrong password!";
        }
    }
}