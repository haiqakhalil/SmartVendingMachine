# 🏧 Smart Vending Machine System
A full-stack web-based Smart Vending Machine application built with **Java Spring Boot** (Backend) + **HTML/CSS/JavaScript** (Frontend) and **MySQL** database, following strict **MVC Architecture**.

---

## 👩‍💻 Author
**Haiqa Khalil**
OOP Lab
University of Engineering and Technology, Lahore

---

## 📁 Project Structure
```
SmartVendingMachine/
├── backend/               # Java Spring Boot (MVC)
│   └── src/main/java/com/vendingmachine/
│       ├── models/        # OOP Entity classes
│       ├── controllers/   # REST API endpoints
│       ├── views/         # Console view (testing)
│       ├── utils/         # FileHandler, helpers
│       └── config/        # CORS configuration
│   └── index.html         # Main frontend file
├── database/              # MySQL schema
│   └── schema.sql
├── docs/                  # Documentation
└── README.md
```

---

## 🛠 Tech Stack
| Layer | Technology |
|---|---|
| Backend | Java 17 + Spring Boot 3.3.5 |
| Frontend | HTML + CSS + JavaScript |
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

## 🌐 How Frontend Works
The frontend is a single **`index.html`** file served directly by Spring Boot at `http://localhost:8080`.

- No separate framework needed
- Pure HTML, CSS, and JavaScript
- Calls backend REST API using `fetch()`
- Runs in browser at: `http://localhost:8080`

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
- IntelliJ IDEA

---

## 🚀 Setup & Run

### Step 1: Clone the Repository
```
git clone https://github.com/haiqakhalil/SmartVendingMachine.git
cd SmartVendingMachine
```

### Step 2: Setup MySQL Database
Open MySQL and run:
```
source database/schema.sql
```

### Step 3: Backend Setup
```
cd backend
mvn install
mvn spring-boot:run
```

### Step 4: Open in Browser
```
http://localhost:8080
```
Frontend (index.html) is served automatically by Spring Boot — no extra setup needed!

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
| CORS error | Ensure `CorsConfig.java` allows `localhost:8080` |
| Port in use | Change `server.port` in `application.properties` |
| Maven build fail | Run `mvn clean install` |
```
