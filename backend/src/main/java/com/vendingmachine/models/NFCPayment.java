package com.vendingmachine.models;

public class NFCPayment implements PaymentMethod {

    @Override
    public boolean pay(double amount) {
        System.out.println("NFC payment of Rs." + amount + " done!");
        return true;
    }

    @Override
    public String getPaymentType() {
        return "NFC";
    }
}