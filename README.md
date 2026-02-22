# 🛒 ShopEase — Spring Boot E-Commerce App

A complete full-stack e-commerce application with a Spring Boot backend,
H2 in-memory database, and a single-page HTML/JS frontend.

---

## 🗂 Project Structure

```
ecommerce/
├── pom.xml                          ← Maven dependencies
└── src/main/
    ├── java/com/ecommerce/
    │   ├── EcommerceApplication.java         ← App entry point
    │   ├── model/
    │   │   ├── Product.java                  ← DB table: products
    │   │   ├── Customer.java                 ← DB table: customers
    │   │   ├── Order.java                    ← DB table: orders
    │   │   └── OrderItem.java                ← DB table: order_items
    │   ├── repository/
    │   │   ├── ProductRepository.java        ← DB queries for products
    │   │   ├── CustomerRepository.java       ← DB queries for customers
    │   │   └── OrderRepository.java          ← DB queries for orders
    │   ├── service/
    │   │   ├── ProductService.java           ← Product business logic
    │   │   └── OrderService.java             ← Checkout + order logic
    │   ├── controller/
    │   │   ├── ProductController.java        ← REST API: /api/products
    │   │   └── OrderController.java          ← REST API: /api/orders
    │   └── config/
    │       └── DataSeeder.java               ← Seeds 10 sample products on startup
    └── resources/
        ├── application.properties            ← H2 DB config
        └── static/
            └── index.html                    ← Frontend (served by Spring Boot)
```

---

## 🚀 How to Run

### Prerequisites
- Java 17+ installed (`java -version`)
- Maven installed (`mvn -version`)

### Steps

```bash
# 1. Navigate to the project folder
cd ecommerce

# 2. Build and run
mvn spring-boot:run

# 3. Open in browser
# Frontend:    http://localhost:8080
# H2 Console:  http://localhost:8080/h2-console
# API:         http://localhost:8080/api/products
```

### H2 Console Login
- **JDBC URL:** `jdbc:h2:mem:ecommercedb`
- **Username:** `admin`
- **Password:** `admin`

---

## 📊 Data Flow (What happens when you buy something)

```
[Browser/Frontend]
       │
       │  POST /api/orders/checkout  (JSON: customer info + cart items)
       ▼
[OrderController]          ← Receives HTTP request
       │
       ▼
[OrderService.checkout()]  ← Business logic layer
       │
       ├─ 1. Find/Create Customer  → CustomerRepository.save()  → INSERTS into CUSTOMERS table
       ├─ 2. Validate stock        → ProductRepository.findById()
       ├─ 3. Calculate total       → Pure Java math
       ├─ 4. Create Order          → OrderRepository.save()      → INSERTS into ORDERS table
       ├─ 5. Create OrderItems     → Cascade save                → INSERTS into ORDER_ITEMS table
       └─ 6. Reduce stock          → ProductRepository.save()    → UPDATES PRODUCTS table
       │
       ▼
[H2 Database]              ← Data is now persisted!
       │
       ▼
[Response: Order JSON]     ← Sent back to frontend
       │
       ▼
[Frontend shows success]   ← Order confirmed on screen
```

---

## 🌐 REST API Endpoints

### Products
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/products | All active products |
| GET | /api/products/{id} | Single product |
| GET | /api/products/search?keyword=phone | Search |
| GET | /api/products/category/{name} | By category |
| GET | /api/products/categories | All categories |
| POST | /api/products | Create product |
| PUT | /api/products/{id} | Update product |
| DELETE | /api/products/{id} | Soft delete |

### Orders
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/orders/checkout | Place an order (main flow) |
| GET | /api/orders | All orders |
| GET | /api/orders/{id} | Single order with items |
| PUT | /api/orders/{id}/status?status=SHIPPED | Update status |

---

## 💡 Learning Notes

### Why H2?
H2 is a database that runs inside your Java app — no installation needed.
Data lives in memory while the app runs. You can view it live at /h2-console.
To switch to MySQL later, just change application.properties.

### Key Spring Boot Annotations
- `@Entity` — makes a class a DB table
- `@Repository` — marks a class as a data access component
- `@Service` — marks business logic layer
- `@RestController` — handles HTTP requests, returns JSON
- `@Transactional` — wraps operations in a DB transaction (all or nothing)
- `@Autowired` / `@RequiredArgsConstructor` — dependency injection

### JPA Query Methods
Spring generates SQL from method names automatically:
- `findByActiveTrue()` → `SELECT * FROM products WHERE active = true`
- `findByCategoryAndActiveTrue("Electronics")` → adds `AND category = ?`
- `findByNameContainingIgnoreCase("phone")` → `LIKE %phone%`
