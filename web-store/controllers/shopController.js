const Product = require("../models/Product");

function isSale(price, salePrice) {
  return salePrice !== null && salePrice !== undefined && salePrice < price;
}

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

exports.getShopPage = async (req, res) => {
  try {
    const products = await Product.find();
    const cartIds = getCartIds(req);

    res.render("shop", {
      products,
      isSale,
      cartCount: cartIds.length
    });
  } catch (error) {
    res.status(500).send("Error loading shop page");
  }
};

exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const cartIds = getCartIds(req);
    cartIds.push(productId);

    res.cookie("cart", JSON.stringify(cartIds), {
      httpOnly: true
    });

    res.redirect("/shop");
  } catch (error) {
    res.status(500).send("Error adding product to cart");
  }
};

exports.getCartPage = async (req, res) => {
  try {
    const cartIds = getCartIds(req);
    const products = await Product.find({ _id: { $in: cartIds } });

    const productMap = {};
    for (const product of products) {
      productMap[product._id.toString()] = product;
    }

    const cartProducts = [];
    for (const id of cartIds) {
      if (productMap[id]) {
        cartProducts.push(productMap[id]);
      }
    }

    let total = 0;
    for (const product of cartProducts) {
      total += product.salePrice && product.salePrice < product.price? product.salePrice : product.price;
    }

    res.render("cart", {
      products: cartProducts,
      total,
      cartCount: cartIds.length
    });
  } catch (error) {
    res.status(500).send("Error loading cart");
  }
};