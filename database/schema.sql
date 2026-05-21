-- CREATE DATABASE vendingdb;
USE vendingdb;
-- 1. Items table
CREATE TABLE IF NOT EXISTS items (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)   NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    quantity    INT            NOT NULL DEFAULT 0,
    category    VARCHAR(50),
    created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- 2. Payment Methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    method_name VARCHAR(50)    NOT NULL,   -- e.g. CASH, CARD, WALLET
    is_active   BOOLEAN        DEFAULT TRUE
);

-- 3. Vending Machines table
CREATE TABLE IF NOT EXISTS vending_machines (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    location    VARCHAR(150)   NOT NULL,
    status      VARCHAR(20)    DEFAULT 'ACTIVE',  -- ACTIVE / MAINTENANCE
    last_refill TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- 4. Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    item_id             INT            NOT NULL,
    vending_machine_id  INT            NOT NULL,
    payment_method_id   INT            NOT NULL,
    amount_paid         DECIMAL(10, 2) NOT NULL,
    change_returned     DECIMAL(10, 2) DEFAULT 0.00,
    transaction_time    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id)            REFERENCES items(id),
    FOREIGN KEY (vending_machine_id) REFERENCES vending_machines(id),
    FOREIGN KEY (payment_method_id)  REFERENCES payment_methods(id)
);