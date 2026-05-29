package com.vendingmachine.controllers;

public class BuyRequest {
    private int itemId;
    private String paymentType;
    private double amountGiven;

    public int getItemId() { return itemId; }
    public String getPaymentType() { return paymentType; }
    public double getAmountGiven() { return amountGiven; }
}