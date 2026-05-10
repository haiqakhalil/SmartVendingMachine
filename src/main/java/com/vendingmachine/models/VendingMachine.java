package com.vendingmachine.models;

import java.util.ArrayList;

public class VendingMachine {

    private String machineName;
    private ArrayList<Item> inventory;

    public VendingMachine(String machineName) {
        this.machineName = machineName;
        this.inventory = new ArrayList<>();
    }

    public void addItem(Item item) {
        inventory.add(item);
        System.out.println(item.getName() + " added to machine.");
    }

    public void showInventory() {
        System.out.println("\n--- " + machineName + " Inventory ---");
        if (inventory.isEmpty()) {
            System.out.println("Machine is empty!");
        } else {
            for (int i = 0; i < inventory.size(); i++) {
                System.out.println((i + 1) + ". " + inventory.get(i));
            }
        }
    }

    public Item getItem(int index) {
        if (index >= 0 && index < inventory.size()) {
            return inventory.get(index);
        }
        return null;
    }

    public boolean isLowStock(Item item) {
        return item.getQuantity() < 2;
    }

    public ArrayList<Item> getInventory() {
        return inventory;
    }

    public String getMachineName() {
        return machineName;
    }
}