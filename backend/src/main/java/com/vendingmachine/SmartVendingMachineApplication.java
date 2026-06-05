package com.vendingmachine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartVendingMachineApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartVendingMachineApplication.class, args);
        System.out.println("Smart Vending Machine is running!");
        System.out.println("Open: http://localhost:8080");
    }
}