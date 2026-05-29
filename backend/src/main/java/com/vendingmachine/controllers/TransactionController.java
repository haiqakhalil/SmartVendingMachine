package com.vendingmachine.controllers;

import com.vendingmachine.models.Transaction;
import com.vendingmachine.models.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}