const pool = require("../pool");

// Thunder Client or Postman is needed to perform CRUD operations
// get all products
async function getAllProducts() {
  const result = await pool.query("SELECT * FROM products ORDER BY id");
  return result.rows;
}

// get one product
async function getProductById(id) {
  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// create product
async function createProduct(name, price) {
  const result = await pool.query(
    "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
    [name, price]
  );
  return result.rows[0];
}

// update product
async function updateProduct(id, name, price) { 
  const result = await pool.query(
    "UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *",
    [name, price, id]
  );
  return result.rows[0];
}

// delete product
async function deleteProduct(id) {
  const result = await pool.query(
    "DELETE FROM products WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};