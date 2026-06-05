package com.vendingmachine.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "restock_log")
public class RestockLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int itemId;
    private String itemName;
    private int quantityAdded;
    private LocalDateTime restockedAt;


    public RestockLog() {
    }


    public RestockLog(int itemId, String itemName, int quantityAdded) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.quantityAdded = quantityAdded;
        this.restockedAt = LocalDateTime.now();
    }


    public int getId() {
        return id;
    }

    public int getItemId() {
        return itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public int getQuantityAdded() {
        return quantityAdded;
    }

    public LocalDateTime getRestockedAt() {
        return restockedAt;
    }
}