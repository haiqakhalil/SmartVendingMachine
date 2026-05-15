package com.vendingmachine.models;

public class CardPayment implements PaymentMethod {
    private String cardNumber;

    public CardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public boolean pay(double amount) {
        System.out.println("Card payment of Rs." + amount + " successful!");
        return true;
    }

    @Override
    public String getPaymentType() { return "Card"; }
}