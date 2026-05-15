package com.vendingmachine.models;

public class NFCPayment implements PaymentMethod {

    @Override
    public boolean pay(double amount) {
        System.out.println("NFC tap payment of Rs." + amount + " successful!");
        return true;
    }

    @Override
    public String getPaymentType() { return "NFC"; }
}