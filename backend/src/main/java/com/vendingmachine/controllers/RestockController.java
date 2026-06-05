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

    // Restock item
    @PostMapping
    public String restock(@RequestBody RestockRequest request) {

        Optional<Item> result = itemRepository.findById(request.getItemId());

        if (result.isEmpty()) {
            return "Item not found!";
        }

        Item item = result.get();

        // Add quantity
        int newQty = item.getQuantity() + request.getQuantityAdded();
        item.setQuantity(newQty);
        itemRepository.save(item);

        // Save log
        RestockLog log = new RestockLog(item.getId(), item.getName(), request.getQuantityAdded());
        restockLogRepository.save(log);

        return "Restocked! New quantity: " + newQty;
    }

    // Get restock logs
    @GetMapping("/logs")
    public List<RestockLog> getLogs() {
        return restockLogRepository.findAll();
    }
}