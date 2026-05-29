package com.vendingmachine.utils;

import com.vendingmachine.models.Item;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FileHandler {

    private static final String LOG_FILE = "sales_log.txt";

    public static void logTransaction(Item item, String paymentType) {
        try {
            FileWriter fw = new FileWriter(LOG_FILE, true);
            BufferedWriter bw = new BufferedWriter(fw);

            String timestamp = LocalDateTime.now()
                    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            bw.write(timestamp + " | " + item.getName() +
                    " | Rs." + item.getPrice() +
                    " | " + paymentType);
            bw.newLine();
            bw.close();

            System.out.println("Transaction logged!");
        } catch (IOException e) {
            System.out.println("Log error: " + e.getMessage());
        }
    }

    public static void showLogs() {
        try {
            BufferedReader br = new BufferedReader(new FileReader(LOG_FILE));
            String line;
            System.out.println("\n--- Sales Log ---");
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            br.close();
        } catch (IOException e) {
            System.out.println("No logs found!");
        }
    }
}