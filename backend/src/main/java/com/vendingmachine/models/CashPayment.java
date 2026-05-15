package com.vendingmachine.models;

public class CashPayment implements PaymentMethod {
    private double cashGiven;

    public CashPayment(double cashGiven) {
        this.cashGiven = cashGiven;
    }

    @Override
    public boolean pay(double amount) {
        if (cashGiven >= amount) {
            System.out.println("Cash payment successful! Change: Rs." + (cashGiven - amount));
            return true;
        }
        System.out.println("Insufficient cash!");
        return false;
    }

    @Override
    public String getPaymentType() { return "Cash"; }
}