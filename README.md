# 🏧 Smart Vending Machine System

A full-stack web-based Smart Vending Machine application built with **Java Spring Boot** (Backend) + **Next.js** (Frontend) and **MySQL** database, following strict **MVC Architecture**.

---

## 👩‍💻 Author

**Haiqa Khalil** — 2025-CYS-57  
OOP Lab — Spring 2025  
University of Engineering and Technology, Lahore  
Instructor: Sir Shahmeer Nawaz

---

## 📁 Project Structure

SmartVendingMachine/
├── backend/               # Java Spring Boot (MVC)
│   └── src/main/java/com/vendingmachine/
│       ├── models/        # OOP Entity classes
│       ├── controllers/   # REST API endpoints
│       ├── views/         # Console view (testing)
│       ├── utils/         # FileHandler, helpers
│       └── config/        # CORS configuration
├── frontend/              # Next.js UI
│   ├── app/               # Pages
│   └── components/        # UI components
├── database/              # MySQL schema
│   └── schema.sql
├── docs/                  # Documentation
└── README.md

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17 + Spring Boot 3.3.5 |
| Frontend | Next.js 15 + Tailwind CSS |
| Database | MySQL 8 |
| ORM | Spring Data JPA |
| API | REST (JSON) |
| Build Tool | Maven |
| Version Control | Git + GitHub |

---

## ✨ Features

- 🛒 Product catalog with real-time stock display
- 💳 Multi-payment support: Cash, Card, and NFC
- 📦 Admin inventory management (add, edit, delete items)
- 📊 Sales dashboard with full transaction history
- 🔐 Operator login with password hashing
- 📝 Transaction log saved to MySQL + sales_log.txt
- ⚠️ Low-stock alerts when quantity drops below 2
- 🔄 Restock logging with operator tracking

---

## 🗄 Database — 4 Tables

| Table | Purpose |
|---|---|
| `items` | Product catalog |
| `transactions` | Purchase history |
| `operators` | Admin accounts |
| `restock_log` | Stock audit trail |

---

## 🔗 REST API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/items` | Fetch all items |
| POST | `/api/items` | Add new item |
| DELETE | `/api/items/{id}` | Delete item |
| POST | `/api/vending/buy` | Purchase item |
| GET | `/api/transactions` | Sales history |
| POST | `/api/operators/login` | Admin login |
| POST | `/api/restock` | Restock item |
| GET | `/api/restock/logs` | Restock history |

---

## ⚙️ Prerequisites

- Java 17+
- Maven 3.9+
- MySQL 8
- Node.js 18+
- IntelliJ IDEA

---

## 🚀 Setup & Run

### Step 1: Clone the Repository

git clone https://github.com/haiqakhalil/SmartVendingMachine.git
cd SmartVendingMachine

### Step 2: Setup MySQL Database

Open MySQL and run:
source database/schema.sql

### Step 3: Backend Setup

cd backend
mvn install
mvn spring-boot:run
Backend runs at: `http://localhost:8080`

### Step 4: Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs at: `http://localhost:3000`

---

## 🧠 OOP Concepts Demonstrated

| Concept | Where Used |
|---|---|
| Encapsulation | `Item.java` — private fields + getters/setters |
| Abstraction | `PaymentMethod.java` — interface |
| Polymorphism | Cash, Card, NFC all implement `pay()` |
| Inheritance | Payment classes implement `PaymentMethod` |
| Collections | `ArrayList<Item>` in `VendingMachine.java` |
| File I/O | `FileHandler.java` — BufferedWriter |
| Exception Handling | try-catch in all controllers |

---

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| MySQL connection error | Check `application.properties` credentials |
| CORS error | Ensure `CorsConfig.java` allows `localhost:3000` |
| Port in use | Change `server.port` in `application.properties` |
| Maven build fail | Run `mvn clean install` |
   
