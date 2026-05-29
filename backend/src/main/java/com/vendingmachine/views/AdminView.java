package com.vendingmachine.views;

import com.vendingmachine.utils.FileHandler;
import java.util.Scanner;

public class AdminView {

    private Scanner scanner = new Scanner(System.in);

    public void start() {
        System.out.println("============================");
        System.out.println("       Admin Panel          ");
        System.out.println("============================");

        boolean running = true;
        while (running) {
            System.out.println("\n1. View Sales Log");
            System.out.println("2. Open Web Dashboard");
            System.out.println("3. Exit");
            System.out.print("Choose: ");

            int choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    FileHandler.showLogs();
                    break;
                case 2:
                    System.out.println("Open browser: http://localhost:3000/admin");
                    break;
                case 3:
                    System.out.println("Exiting admin panel!");
                    running = false;
                    break;
                default:
                    System.out.println("Invalid option!");
            }
        }
    }
}