const express = require("express");
const router = express.Router();

// Sample route
router.get("/", (req, res) => {
  res.render("index");
});

router.post("/addToCart", async (req, res) => {
  let { itemId, quantity } = req.body;
  let item = await Product.findById(itemId);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { cart: { itemId: item._id, quantity: req.body.quantity || 1 } },
    },
    {
      new: true,
    }
  );

  res.send(`Added item ${itemId} with quantity ${quantity} to cart.`);
});

module.exports = router;
