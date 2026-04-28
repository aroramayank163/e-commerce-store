const Product = require("../models/Product");
const Order = require("../models/Order");

function getCartIds(req) {
  const cart = req.cookies.cart;
  if (!cart) {
    return [];
  }

  try {
    return JSON.parse(cart);
  } catch (error) {
    return [];
  }
}

exports.createOrder = async (req, res) => {
  try {
    const cartIds = getCartIds(req);

    if (cartIds.length === 0) {
      return res.status(400).send("Cart is empty");
    }

    const products = await Product.find({ _id: { $in: cartIds } });

    const productMap = {};
    for (const product of products) {
      productMap[product._id.toString()] = product;
    }

    const validProducts = [];
    for (const id of cartIds) {
      if (productMap[id]) {
        validProducts.push(productMap[id]);
      }
    }

    if (validProducts.length === 0) {
      return res.status(400).send("No valid products in cart");
    }

    let total = 0;
    for (const product of validProducts) {
      total += product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;
    }

    const order = await Order.create({
      userName: "Mayank",
      products: validProducts.map((p) => p._id),
      totalPrice: total
    });

    res.cookie("cart", JSON.stringify([]), {
      httpOnly: true
    });

    res.render("orderSuccess", {
      order,
      itemCount: validProducts.length,
      total,
      cartCount: 0
    });
  } catch (error) {
    res.status(500).send("Error creating order");
  }
};

exports.getOrdersJson = async (req, res) => {
  try {
    const orders = await Order.find({ userName: "Mayank" }).populate("products");

    const formattedOrders = [];

    for (const order of orders) {
      const formattedProducts = [];

      for (const product of order.products) {
        let pricePaid = product.price;

        if (product.salePrice && product.salePrice < product.price) {
          pricePaid = product.salePrice;
        }

        formattedProducts.push({
          productId: product._id,
          name: product.name,
          pricePaid: pricePaid
        });
      }

      formattedOrders.push({
        _id: order._id,
        userName: order.userName,
        products: formattedProducts,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        __v: order.__v
      });
    }

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ error: "Error loading orders" });
  }
};

// Delete All orders
exports.dropAll = async(req, res)=>{
  try{
    await Order.deleteMany({}); 
    res.redirect("/shop");
  }catch(error){
    res.status(500).send("Error in fetching")
  }
}
