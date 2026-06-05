package com.vendingmachine.views;

import com.vendingmachine.utils.FileHandler;
import java.util.Scanner;

public class ConsoleView {

    Scanner scanner = new Scanner(System.in);

    public void start() {

        System.out.println("Welcome to Vend-O-Buddy!");
        System.out.println("========================");

        boolean running = true;

        while (running) {

            System.out.println("\n1. Open store in browser");
            System.out.println("2. Show sales log");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");

            int choice = scanner.nextInt();

            if (choice == 1) {
                System.out.println("Open this link: http://localhost:3000");

            } else if (choice == 2) {
                FileHandler.showLogs();

            } else if (choice == 3) {
                System.out.println("Goodbye!");
                running = false;

            } else {
                System.out.println("Wrong choice! Try again.");
            }
        }
    }
}