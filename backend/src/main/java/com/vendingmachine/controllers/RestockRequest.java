package com.vendingmachine.controllers;

public class RestockRequest {
    private int itemId;
    private int quantityAdded;

    public int getItemId() { return itemId; }
    public int getQuantityAdded() { return quantityAdded; }
}