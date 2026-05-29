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

    @PostMapping("/buy")
    public String buyItem(@RequestBody BuyRequest request) {
        Optional<Item> optionalItem = itemRepository.findById(request.getItemId());

        if (optionalItem.isEmpty()) {
            return "Item not found!";
        }

        Item item = optionalItem.get();

        if (item.getQuantity() <= 0) {
            return "Out of stock!";
        }

        if (item.getQuantity() < 2) {
            System.out.println("WARNING: Low stock on " + item.getName());
        }

        item.setQuantity(item.getQuantity() - 1);
        itemRepository.save(item);

        Transaction transaction = new Transaction(
                item.getName(),
                item.getPrice(),
                request.getPaymentType()
        );
        transactionRepository.save(transaction);

        FileHandler.logTransaction(item, request.getPaymentType());

        return "Purchase successful! Dispensing: " + item.getName();
    }
}