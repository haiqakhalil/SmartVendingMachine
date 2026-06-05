package com.vendingmachine.views;

import com.vendingmachine.utils.FileHandler;
import java.util.Scanner;

public class AdminView {

    Scanner scanner = new Scanner(System.in);

    public void start() {

        System.out.println("Admin Panel");
        System.out.println("===========");

        boolean running = true;

        while (running) {

            System.out.println("\n1. Show sales log");
            System.out.println("2. Open admin panel in browser");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");

            int choice = scanner.nextInt();

            if (choice == 1) {
                FileHandler.showLogs();

            } else if (choice == 2) {
                System.out.println("Open this link: http://localhost:3000/admin");

            } else if (choice == 3) {
                System.out.println("Exiting...");
                running = false;

            } else {
                System.out.println("Wrong choice!");
            }
        }
    }
}