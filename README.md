# 🛒 MyStore — E-Commerce Web Application & API

## Overview

MyStore is a backend-focused full-stack project that demonstrates the design and implementation of an e-commerce system using two complementary architectures:

- **Web Store (`web-store`)** — a server-rendered application providing a complete storefront experience  
- **Order & Product API (`order-product-api`)** — a RESTful API for managing products and orders using a relational database  

This project showcases practical backend engineering skills and is structured to reflect real-world application design, making it suitable for **internships, co-op roles, and entry-level software engineering positions**.

---

## Architecture

The system is divided into two independent components to highlight different backend approaches:

### Web Store (`web-store`)

A server-side rendered application built with Express and MongoDB.

**Responsibilities:**
- Render storefront pages and product listings  
- Manage shopping cart using cookies  
- Handle order creation and storage  
- Provide a user-facing shopping experience  

---

### Order & Product API (`order-product-api`)

A RESTful API built with Express and PostgreSQL.

**Responsibilities:**
- Manage product catalog (CRUD operations)  
- Handle order creation and updates  
- Provide structured data endpoints  
- Maintain relational data integrity  

---

## Key Features

### Web Store
- Server-side rendering using Pug templates  
- Dynamic product display with pricing logic (including sale pricing)  
- Cookie-based cart management  
- Order creation and storage in MongoDB  
- MVC-based project structure  

### Order & Product API
- RESTful API design with resource-based endpoints  
- Full CRUD operations for products and orders  
- PostgreSQL integration with relational schema  
- Parameterized queries for consistent database operations  
- Modular routing and controller separation  

---

## Technology Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Templating Engine:** Pug  
- **Databases:**  
  - MongoDB (Web Store)  
  - PostgreSQL (API)  
- **Libraries:**  
  - Mongoose  
  - pg  
  - cookie-parser  

---

## Project Structure

```
A3/
├── web-store/
│ ├── app.js
│ ├── controllers/
│ │ ├── orderController.js
│ │ └── shopController.js
│ ├── models/
│ │ ├── Order.js
│ │ └── Product.js
│ ├── views/
│ └── public/
│
├── order-product-api/
│ ├── app.js
│ ├── pool.js
│ ├── controllers/
│ │ ├── orderController.js
│ │ └── productController.js
│ ├── models/
│ │ ├── order.js
│ │ └── product.js
│ └── routes/
│   ├── orders.js
│   └── products.js
│
├── package.json
└── README.md
```

---

## Application Design

The project follows standard backend design principles:

- **Separation of Concerns** — Routes, controllers, models, and views are clearly separated  
- **Modularity** — Each feature is structured into independent components  
- **Scalability** — Architecture supports future expansion  
- **Maintainability** — Organized and readable codebase  

---

## Database Design

### MongoDB (Web Store)

Used for flexible document-based storage.

**Collections:**
- **Products** — stores product details including pricing and sale values  
- **Orders** — stores user orders with product references and totals  

---

### PostgreSQL (Order & Product API)

Used for structured relational data.

**Tables:**

- **Products**
  - Stores product information (name, price)

- **Orders**
  - Stores order details (quantity, associated product)

**Relationships:**
- Orders reference products through foreign keys  
- Data retrieval uses SQL joins for combined results  

---

## API Overview

### Product Endpoints
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /products | Retrieve all products |
| GET    | /products/:id | Retrieve a specific product |
| POST   | /products | Create a new product |
| PUT    | /products/:id | Update a product |
| DELETE | /products/:id | Delete a product |
```

---

### Order Endpoints
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /orders | Retrieve all orders |
| GET    | /orders/:id | Retrieve a specific order |
| POST   | /orders | Create a new order |
| PUT    | /orders/:id | Update an order |
| DELETE | /orders/:id | Delete an order |
```

---

## Notable Implementation Details

- Cart state is maintained using HTTP cookies  
- Product pricing supports both regular and sale values  
- MongoDB enables flexible schema handling in the storefront  
- PostgreSQL ensures structured and relational data integrity  
- SQL queries are parameterized for consistent execution  
- Database tables are initialized automatically in the API  

---

## Learning Outcomes

This project demonstrates:

- Backend development using Express.js  
- RESTful API design and implementation  
- Integration with both NoSQL and SQL databases  
- MVC architecture in real-world applications  
- State management using cookies  
- Clean and scalable project structuring  

---

## Future Improvements

- Add authentication and authorization (JWT or sessions)  
- Integrate a frontend framework (e.g., React)  
- Deploy application to cloud platforms  
- Improve validation and error handling  
- Add automated testing  

---

## Author

**Mayank Arora**

---

## License

This project is intended for educational and demonstration purposes.