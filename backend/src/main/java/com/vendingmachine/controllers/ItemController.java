package com.vendingmachine.controllers;

import com.vendingmachine.models.Item;
import com.vendingmachine.models.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @PostMapping
    public Item addItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable int id) {
        itemRepository.deleteById(id);
        return "Item deleted!";
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable int id, @RequestBody Item updatedItem) {
        updatedItem.setId(id);
        return itemRepository.save(updatedItem);
    }
}