package com.vendingmachine.models;

import jakarta.persistence.*;

@Entity
@Table(name = "operators")
public class Operator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String username;
    private String passwordHash;
    private String role;

    public Operator() {}

    public Operator(String name, String username, String passwordHash, String role) {
        this.name = name;
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getUsername() { return username; }
    public String getPasswordHash() { return passwordHash; }
    public String getRole() { return role; }
    public void setName(String name) { this.name = name; }
    public void setUsername(String username) { this.username = username; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public void setRole(String role) { this.role = role; }
}