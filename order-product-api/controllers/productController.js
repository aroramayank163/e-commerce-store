const productModel = require("../models/product");

async function getProducts(req, res) {
  const products = await productModel.getAllProducts();
  res.json(products);
}

async function getProduct(req, res) {
  const product = await productModel.getProductById(req.params.id);

  if (!product) return res.status(404).json({ message: "Not found" });

  res.json(product);
}

async function addProduct(req, res) {
  const { name, price } = req.body;
  const product = await productModel.createProduct(name, price);
  res.json(product);
}

async function updateProduct(req, res) {
  const { name, price } = req.body;
  const product = await productModel.updateProduct(
    req.params.id,
    name,
    price
  );

  if (!product) return res.status(404).json({ message: "Not found" });

  res.json(product);
}

async function removeProduct(req, res) {
  const product = await productModel.deleteProduct(req.params.id);

  if (!product) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted" });
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  removeProduct
};