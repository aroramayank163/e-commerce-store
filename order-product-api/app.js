const express = require("express");
const app = express();

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const pool = require("./pool");

app.use(express.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// auto create tables
async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      price NUMERIC(10,2)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      quantity INTEGER,
      product_id INTEGER REFERENCES products(id)
    )
  `);

  console.log("Tables are ready for data entry");
}

init();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});