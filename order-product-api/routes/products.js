const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);
router.post("/", controller.addProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.removeProduct);

module.exports = router;