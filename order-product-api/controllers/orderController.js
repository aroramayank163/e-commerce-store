const orderModel = require("../models/order");

async function getOrders(req, res) {
  const orders = await orderModel.getAllOrders();
  res.json(orders);
}

async function getOrder(req, res) {
  const order = await orderModel.getOrderById(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  res.json(order);
}

async function addOrder(req, res) {
  const { quantity, product_id } = req.body;
  const order = await orderModel.createOrder(quantity, product_id);
  res.json(order);
}

async function updateOrder(req, res) {
  const { quantity, product_id } = req.body;

  const order = await orderModel.updateOrder(
    req.params.id,
    quantity,
    product_id
  );

  if (!order) return res.status(404).json({ message: "Not found" });

  res.json(order);
}

async function removeOrder(req, res) {
  const order = await orderModel.deleteOrder(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted" });
}

module.exports = {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  removeOrder
};