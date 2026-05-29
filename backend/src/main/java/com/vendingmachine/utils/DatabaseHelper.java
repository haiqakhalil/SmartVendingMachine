package com.vendingmachine.utils;

import java.sql.*;

public class DatabaseHelper {

    private static final String URL = "jdbc:mysql://localhost:3306/vendingdb";
    private static final String USER = "root";
    private static final String PASSWORD = "yourpassword";

    private static Connection connection;

    public static Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                connection = DriverManager.getConnection(URL, USER, PASSWORD);
                System.out.println("Database connected!");
            }
        } catch (SQLException e) {
            System.out.println("Connection error: " + e.getMessage());
        }
        return connection;
    }

    public static void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Connection closed!");
            }
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}