const express = require("express");
const router = express.Router();
const productmodel = require("../Models/productmodel");
const { isAuthenticated, isAdmin } = require("../Middleware/isAuthenticated");
const cartmodel = require("../Models/cartmodel");

router.get("/usercart", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartmodel.find({ userId: userId });
    if (!cart) return res.status(400).send({ message: "no cart found" });

    return res.status(200).json({
      cart,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/addtocart", isAuthenticated, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await productmodel.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    const userId = req.user._id;
    let cart = await cartmodel.findOne({ userId });
    if (!cart) {
      cart = new cartmodel({
        userId: userId,
        products: [],
        totalcartamount: 0,
      });
    }

    const index = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index > -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({
        productId: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        quantity,
      });
    }

    let totalprice = 0;
    for (let item of cart.products) {
      const product = await productmodel.findById(item.productId);
      if (product) {
        totalprice += product.price * item.quantity;
      }
    }
    cart.totalcartamount = totalprice;
    await cart.save();
    return res.status(200).json({
      cart,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
router.put("/updatecart", isAuthenticated, async (req, res) => {
  try {
    const { action, productId } = req.body;
    const product = await productmodel.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    const userId = req.user._id;
    let cart = await cartmodel.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "no cart" });
    }

    const index = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index > -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not in cart" });
    }
    if (action === "increment") {
      cart.products[index].quantity += 1;
    } else if (action === "decrement") {
      cart.products[index].quantity -= 1;
      if (cart.products[index].quantity <= 0) {
        cart.products.splice(index, 1); // Remove product if quantity becomes 0
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    let totalprice = 0;
    for (let item of cart.products) {
      const product = await productmodel.findById(item.productId);
      if (product) {
        totalprice += product.price * item.quantity;
      }
    }
    cart.totalcartamount = totalprice;
    await cart.save();
    return res.status(200).json({
      cart,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/removecartitem", isAuthenticated, async (req, res) => {
  try {
    const { productId } = req.body; // Use body for DELETE
    const userId = req.user._id;

    const cart = await cartmodel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products.splice(index, 1);

    // Recalculate total price
    let totalprice = 0;
    for (let item of cart.products) {
      const product = await productmodel.findById(item.productId);
      if (product) {
        totalprice += product.price * item.quantity;
      }
    }

    cart.totalcartamount = totalprice;

    await cart.save();

    return res.status(200).json({
      message: "Product removed from cart",
      cart,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
