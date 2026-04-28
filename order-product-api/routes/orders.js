const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.get("/", controller.getOrders);
router.get("/:id", controller.getOrder);
router.post("/", controller.addOrder);
router.put("/:id", controller.updateOrder);
router.delete("/:id", controller.removeOrder);

module.exports = router;