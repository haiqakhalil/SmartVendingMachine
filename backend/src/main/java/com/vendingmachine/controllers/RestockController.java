package com.vendingmachine.controllers;

import com.vendingmachine.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restock")
@CrossOrigin(origins = "http://localhost:3000")
public class RestockController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RestockLogRepository restockLogRepository;

    @PostMapping
    public String restock(@RequestBody RestockRequest request) {
        Optional<Item> optionalItem = itemRepository.findById(request.getItemId());

        if (optionalItem.isEmpty()) {
            return "Item not found!";
        }

        Item item = optionalItem.get();
        item.setQuantity(item.getQuantity() + request.getQuantityAdded());
        itemRepository.save(item);

        return "Restocked! New quantity: " + item.getQuantity();
    }

    @GetMapping("/logs")
    public List<RestockLog> getLogs() {
        return restockLogRepository.findAll();
    }
}