package com.vendingmachine.models;

import java.util.ArrayList;

public class VendingMachine {

    private String machineName;
    private ArrayList<Item> itemList;


    public VendingMachine(String machineName) {
        this.machineName = machineName;
        this.itemList = new ArrayList<Item>();
    }


    public void addItem(Item item) {
        itemList.add(item);
        System.out.println(item.getName() + " added to " + machineName);
    }


    public void showAllItems() {
        System.out.println("Items in " + machineName + ":");
        for (int i = 0; i < itemList.size(); i++) {
            System.out.println((i + 1) + ". " + itemList.get(i).getName());
        }
    }

    public Item getItem(int index) {
        if (index >= 0 && index < itemList.size()) {
            return itemList.get(index);
        }
        return null;
    }


    public boolean isLowStock(Item item) {
        if (item.getQuantity() < 2) {
            return true;
        }
        return false;
    }

    public String getMachineName() {
        return machineName;
    }
}