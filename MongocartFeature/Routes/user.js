const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User");
const Product = require("../models/Product");
const Orders = require("../models/Order");

// Sample route
router.get("/", async (req, res) => {
  let product = await Product.find({});
  res.render("index", { Products: product });
});

//login
router.get("/login", (req, res) => {
  res.render("login");
});

//product Creation
router.post("/createProduct", async (req, res) => {
  let { name, price, description } = req.body;
  let newProduct = await Product.create({ name, price, description });
  res.send(`Product ${newProduct.name} created successfully.`);
});

//add to cart
router.post("/cart/add", isLoggedIn, async (req, res) => {
  let { id, quantity } = req.body;
  let cartItem = await User.findOne(
    { _id: req.user.id, "cart.itemId": id },
    { "cart.$": 1 }
  );

  if (cartItem) {
    let newQuantity = cartItem.cart[0].quantity + quantity;

    await User.findOneAndUpdate(
      { _id: req.user.id, "cart.itemId": id },
      { $set: { "cart.$.quantity": newQuantity } },
      { new: true }
    );
  } else {
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { cart: { itemId: id, quantity: 1 } } },
      { new: true }
    );
  }

  res.json(`Added item ${id} with quantity ${quantity} to cart.`);
});

//place order

router.post("/createOrder", isLoggedIn, async (req, res) => {
  let cartItems = await User.findById(req.user.id).populate("cart.itemId");
  let products = cartItems.cart.map((cartItem) => {
    return {
      id: cartItem.itemId._id,
      quantity: cartItem.quantity,
      price: cartItem.itemId.price * cartItem.quantity,
    };
  });
  for (let i = 0; i < products.length; i++) {
    await Orders.create({
      user: req.user.id,
      price: products[i].price,
      product: products[i].id,
      quantity: products[i].quantity,
    });
  }
  await User.findByIdAndUpdate(req.user.id, { $set: { cart: [] } });
  res.json("Order created successfully.");
});

router.get("/orders", isLoggedIn, async (req, res) => {
  let orders = await Orders.find({ user: req.user.id }).populate("product");
  res.render("/orders", { orders });
});
router.post("/cart/delete/:productId", isLoggedIn, async (req, res) => {
  let { productId } = req.params;

  await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { cart: { itemId: productId } } },
    { new: true }
  );
  res.json(`Removed product ${productId} from cart.`);
});

router.post("/cart/dec/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;

  // Get the cart item
  let cartItem = await User.findOne(
    { _id: req.user.id, "cart.itemId": id },
    { "cart.$": 1 }
  );

  if (!cartItem) {
    return res.status(404).json("Item not found in cart");
  }

  let newQuantity = cartItem.cart[0].quantity - 1;
  console.log(newQuantity);

  if (newQuantity <= 0) {
    // Remove item if quantity is 0
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { cart: { itemId: id } } },
      { new: true }
    );
  } else {
    // Decrement quantity
    await User.findOneAndUpdate(
      { _id: req.user.id, "cart.itemId": id },
      { $set: { "cart.$.quantity": newQuantity } },
      { new: true }
    );
  }

  res.json(`Updated cart for product ${id}.`);
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await User.findById(req.user.id).populate("cart.itemId");
  res.render("cart", { cartItems: user.cart });
});
module.exports = router;
