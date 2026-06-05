package com.vendingmachine.utils;

import java.sql.*;

public class DatabaseHelper {

    static String url = "jdbc:mysql://localhost:3306/vendingdb";
    static String user = "root";
    static String password = "yourpassword";

    static Connection connection = null;

    // Connect to database
    public static Connection getConnection() {

        try {
            if (connection == null) {
                connection = DriverManager.getConnection(url, user, password);
                System.out.println("Connected to database!");
            }
        } catch (SQLException e) {
            System.out.println("Connection error: " + e.getMessage());
        }

        return connection;
    }

    // Close connection
    public static void closeConnection() {

        try {
            if (connection != null) {
                connection.close();
                System.out.println("Connection closed!");
            }
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}