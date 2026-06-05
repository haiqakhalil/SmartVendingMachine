package com.vendingmachine.utils;

import com.vendingmachine.models.Item;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FileHandler {

    // File name for saving logs
    static String logFile = "sales_log.txt";

    // Save one transaction to file
    public static void logTransaction(Item item, String paymentType) {

        try {
            FileWriter fw = new FileWriter(logFile, true);
            BufferedWriter bw = new BufferedWriter(fw);

            String time = LocalDateTime.now().format(
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            );

            String line = time + " | " + item.getName() + " | Rs." + item.getPrice() + " | " + paymentType;

            bw.write(line);
            bw.newLine();
            bw.close();

            System.out.println("Saved to file!");

        } catch (IOException e) {
            System.out.println("Error saving to file: " + e.getMessage());
        }
    }

    // Read and show all logs
    public static void showLogs() {

        try {
            BufferedReader br = new BufferedReader(new FileReader(logFile));
            String line;

            System.out.println("--- Sales Log ---");

            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }

            br.close();

        } catch (IOException e) {
            System.out.println("No logs found yet.");
        }
    }
}