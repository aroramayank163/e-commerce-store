const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {timestamps: true} 
);

module.exports = mongoose.model("Order", orderSchema);