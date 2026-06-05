package com.vendingmachine.models;

public class CashPayment implements PaymentMethod {

    private double cashGiven;

    public CashPayment(double cashGiven) {
        this.cashGiven = cashGiven;
    }

    @Override
    public boolean pay(double amount) {

        if (cashGiven >= amount) {
            double change = cashGiven - amount;
            System.out.println("Payment done! Change: Rs." + change);
            return true;
        } else {
            System.out.println("Not enough cash!");
            return false;
        }
    }

    @Override
    public String getPaymentType() {
        return "Cash";
    }
}