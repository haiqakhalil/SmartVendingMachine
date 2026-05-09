package com.vendingmachine.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VendingController {

    @GetMapping("/")
    public String home() {
        return "Vending Machine App is Running!";
    }
}