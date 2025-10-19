const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  price: Number,
  Quantity: Number,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Order", orderSchema);
