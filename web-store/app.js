const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Product = require("./models/Product");
const shopController = require("./controllers/shopController");
const orderController = require("./controllers/orderController");
const Order = require("./models/Order");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const user = {
  name: "Mayank",
  isPremium: true
};

app.use((req, res, next) => {
  req.user = user;
  res.locals.user = user;
  next();
});

app.get("/", (req, res) => {
  res.render("home", { cartCount: 0 });
});

app.get("/shop", shopController.getShopPage);
app.post("/cart/add/:id", shopController.addToCart);
app.get("/cart", shopController.getCartPage);
app.post("/order/create", orderController.createOrder);
app.get("/orders", orderController.getOrdersJson);
app.post("/dropAll", orderController.dropAll)

mongoose
  .connect("mongodb://127.0.0.1:27017/MyStoreDB")
  .then(async () => {
    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.insertMany([
        { name: "Headphones", price: 150, salePrice: 99 },
        { name: "Monitor", price: 300, salePrice: 250 },
        { name: "Keyboard", price: 80 }
      ]);
    }


    app.listen(PORT, () => {
      console.log(`Running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });