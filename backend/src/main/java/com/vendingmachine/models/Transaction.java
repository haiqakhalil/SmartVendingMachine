package com.vendingmachine.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String itemName;
    private double amount;
    private String paymentType;
    private LocalDateTime purchasedAt;

    public Transaction() {}

    public Transaction(String itemName, double amount, String paymentType) {
        this.itemName = itemName;
        this.amount = amount;
        this.paymentType = paymentType;
        this.purchasedAt = LocalDateTime.now();
    }

    public int getId() { return id; }
    public String getItemName() { return itemName; }
    public double getAmount() { return amount; }
    public String getPaymentType() { return paymentType; }
    public LocalDateTime getPurchasedAt() { return purchasedAt; }
}