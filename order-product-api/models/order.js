const pool = require("../pool");

// Thunder Client or Postman is needed to perform CRUD operations
// get all orders
async function getAllOrders() {
  const result = await pool.query(`
    SELECT o.id, o.quantity, o.product_id,
           p.name AS product_name, p.price
    FROM orders o
    JOIN products p ON o.product_id = p.id
    ORDER BY o.id
  `);
  return result.rows;
}

// get one order
async function getOrderById(id) {
  const result = await pool.query(`
    SELECT o.id, o.quantity, o.product_id,
           p.name AS product_name, p.price
    FROM orders o
    JOIN products p ON o.product_id = p.id
    WHERE o.id = $1
  `, [id]);

  return result.rows[0];
}

// create order
async function createOrder(quantity, product_id) { 
  const result = await pool.query(
    "INSERT INTO orders (quantity, product_id) VALUES ($1, $2) RETURNING *",
    [quantity, product_id]
  );
  return result.rows[0];
}

// update order
async function updateOrder(id, quantity, product_id) { 
  const result = await pool.query(
    "UPDATE orders SET quantity=$1, product_id=$2 WHERE id=$3 RETURNING *",
    [quantity, product_id, id]
  );
  return result.rows[0];
}

// delete order
async function deleteOrder(id) {
  const result = await pool.query(
    "DELETE FROM orders WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};


