package com.vendingmachine.controllers;

import com.vendingmachine.models.*;
import com.vendingmachine.utils.FileHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/vending")
@CrossOrigin(origins = "http://localhost:3000")
public class VendingController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // Buy item
    @PostMapping("/buy")
    public String buyItem(@RequestBody BuyRequest request) {

        // Find item
        Optional<Item> result = itemRepository.findById(request.getItemId());

        if (result.isEmpty()) {
            return "Item not found!";
        }

        Item item = result.get();

        // Check stock
        if (item.getQuantity() == 0) {
            return "Item is out of stock!";
        }

        // Low stock warning
        if (item.getQuantity() < 2) {
            System.out.println("Warning: Low stock for " + item.getName());
        }

        // Reduce quantity
        item.setQuantity(item.getQuantity() - 1);
        itemRepository.save(item);

        // Save to database
        Transaction t = new Transaction(item.getName(), item.getPrice(), request.getPaymentType());
        transactionRepository.save(t);

        // Save to file
        FileHandler.logTransaction(item, request.getPaymentType());

        return "Purchase successful! Enjoy your " + item.getName() + "!";
    }
}