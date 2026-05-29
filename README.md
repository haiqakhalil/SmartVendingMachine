# 🏧 Smart Vending Machine System

A full-stack web-based Smart Vending Machine built with **Java Spring Boot** + **Next.js** + **MySQL**, strictly following **MVC Architecture** and **OOP principles**.

---

## 👩‍💻 Author

**Haiqa Khalil** — 2025-CYS-57
OOP Lab — Spring 2026
University of Engineering and Technology, Lahore
Instructor: Sir Shahmeer Nawaz

---

## 📁 Project Structure

```
SmartVendingMachine/
├── backend/                          # Java Spring Boot
│   └── src/main/java/com/vendingmachine/
│       ├── models/                   # OOP Entity classes + Repositories
│       │   ├── Item.java             # Product entity (@Entity)
│       │   ├── VendingMachine.java   # Inventory manager (ArrayList)
│       │   ├── PaymentMethod.java    # Interface (Abstraction)
│       │   ├── CashPayment.java      # Cash (implements PaymentMethod)
│       │   ├── CardPayment.java      # Card (implements PaymentMethod)
│       │   ├── NFCPayment.java       # NFC  (implements PaymentMethod)
│       │   ├── Transaction.java      # Purchase record entity
│       │   ├── Operator.java         # Admin account entity
│       │   ├── RestockLog.java       # Restock audit entity
│       │   ├── ItemRepository.java
│       │   ├── TransactionRepository.java
│       │   ├── OperatorRepository.java
│       │   └── RestockLogRepository.java
│       ├── controllers/              # REST API endpoints
│       │   ├── VendingController.java
│       │   ├── ItemController.java
│       │   ├── TransactionController.java
│       │   ├── OperatorController.java
│       │   ├── RestockController.java
│       │   ├── BuyRequest.java
│       │   ├── LoginRequest.java
│       │   └── RestockRequest.java
│       ├── views/                    # Console UI (testing)
│       │   ├── ConsoleView.java
│       │   └── AdminView.java
│       ├── utils/                    # Helper classes
│       │   ├── FileHandler.java      # File I/O (sales_log.txt)
│       │   └── DatabaseHelper.java   # JDBC connection
│       └── config/
│           └── CorsConfig.java       # CORS for Next.js
├── frontend/                         # Next.js 15
│   ├── app/
│   │   ├── page.tsx                  # Home — vending machine UI
│   │   └── admin/page.tsx            # Admin dashboard
│   ├── components/
│   │   ├── ItemCard.tsx
│   │   ├── PaymentModal.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── RestockPanel.tsx
│   └── lib/
│       └── api.ts                    # All fetch() calls
├── database/
│   └── schema.sql                    # MySQL — 4 tables
├── docs/
└── README.md
```

---

## ✨ Features

- 🛒 **200+ Products** across 12 categories with real-time stock
- 💳 **Multi-payment** — Cash (with change), Card, NFC tap
- 📦 **Admin Panel** — Add, edit, delete, restock items
- 📊 **Sales Dashboard** — Full transaction history from MySQL
- 🔐 **Operator Login** — Hashed password authentication
- ⚠️ **Low Stock Alerts** — Warning when quantity drops below 2
- 📝 **Dual Logging** — MySQL transactions + sales_log.txt backup
- 🔄 **Restock Audit** — Every restock logged with operator + timestamp

---

## 🗄 Database — 4 Tables

| Table | Purpose |
|---|---|
| `items` | 200+ products — name, price, quantity, category |
| `transactions` | Every purchase — item, amount, payment type, timestamp |
| `operators` | Admin/staff accounts with hashed passwords |
| `restock_log` | Audit trail — who restocked what and when |

---

## 🌐 REST API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/items` | Fetch all products |
| POST | `/api/items` | Add new product |
| PUT | `/api/items/{id}` | Update product |
| DELETE | `/api/items/{id}` | Delete product |
| POST | `/api/vending/buy` | Purchase item |
| GET | `/api/transactions` | Sales history |
| POST | `/api/operators/login` | Admin login |
| POST | `/api/restock` | Restock item |
| GET | `/api/restock/logs` | Restock history |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17 + Spring Boot 3.3.5 |
| Frontend | Next.js 15 + Tailwind CSS |
| Database | MySQL 8 |
| ORM | Spring Data JPA / Hibernate |
| API | REST (JSON) |
| Build Tool | Maven 3.9 |
| Version Control | Git + GitHub |

---

## 🧠 OOP Concepts

| Concept | Where |
|---|---|
| Encapsulation | `Item.java` — private fields + getters/setters |
| Abstraction | `PaymentMethod.java` — interface |
| Polymorphism | `payment.pay()` works for Cash, Card, NFC |
| Inheritance | Payment classes implement `PaymentMethod` |
| Collections | `ArrayList<Item>` in `VendingMachine.java` |
| File I/O | `FileHandler.java` — BufferedWriter |
| Exception Handling | try-catch in FileHandler, DatabaseHelper |

---

## ⚙️ Prerequisites

- Java 17+
- Maven 3.9+
- MySQL 8
- Node.js 18+
- IntelliJ IDEA

---

## 🚀 Setup & Run

### Step 1 — Clone

```
git clone https://github.com/haiqakhalil/SmartVendingMachine.git
cd SmartVendingMachine
```

### Step 2 — MySQL Setup

```sql
source database/schema.sql
```

### Step 3 — Backend

```
cd backend
mvn spring-boot:run
```
Runs at: `http://localhost:8080`

### Step 4 — Load Sample Data

```sql
USE vendingdb;
-- Run the INSERT statements from database/schema.sql
```

### Step 5 — Frontend

```
cd frontend
npm install
npm run dev
```
Runs at: `http://localhost:3000`

---

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| MySQL connection error | Check `application.properties` credentials |
| CORS error | Verify `CorsConfig.java` allows `localhost:3000` |
| Build fails | Run `mvn clean install` in backend folder |
| Port in use | Change `server.port` in `application.properties` |

---

## 📄 License

This project is for educational purposes — OOP Lab, UET Lahore.
```
