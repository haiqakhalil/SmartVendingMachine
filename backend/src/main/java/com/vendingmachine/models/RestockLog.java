package com.vendingmachine.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "restock_log")
public class RestockLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "operator_id")
    private Operator operator;

    private int quantityAdded;
    private LocalDateTime restockedAt;

    public RestockLog() {}

    public RestockLog(Item item, Operator operator, int quantityAdded) {
        this.item = item;
        this.operator = operator;
        this.quantityAdded = quantityAdded;
        this.restockedAt = LocalDateTime.now();
    }

    public int getId() { return id; }
    public Item getItem() { return item; }
    public Operator getOperator() { return operator; }
    public int getQuantityAdded() { return quantityAdded; }
    public LocalDateTime getRestockedAt() { return restockedAt; }
}