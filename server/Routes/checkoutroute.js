const express = require("express");
const router = express.Router();
const productmodel = require("../Models/productmodel");
const { isAuthenticated, isAdmin } = require("../Middleware/isAuthenticated");
const cartmodel = require("../Models/cartmodel");
const checkoutmodel = require("../Models/checkoutmodel");
const ordermodel = require("../Models/ordermodel");

router.get("/", isAuthenticated, async (req, res) => {
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
router.post("/create-checkout", isAuthenticated, async (req, res) => {
  try {
    const { products, shippingaddress, totalamount, paymentmethod } = req.body;
    const userId = req.user._id;
    if (!products || products.length == 0) {
      return res.status(400).json({ messgae: "no products for checkout" });
    }
    const checkout = await checkoutmodel.create({
      userId,
      products,
      shippingaddress,
      totalamount,
      paymentmethod,
    });
    await checkout.save();
    return res.status(200).json({
      checkout,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
router.put("/update-checkout/:id", isAuthenticated, async (req, res) => {
  try {
    const { paymentStatus, paymentDetails } = req.body;
    const checkout = await checkoutmodel.findById({ _id: req.params.id });
    if (!checkout) return res.status(404).json({ error: "checkout not found" });
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      checkout.save();
      return res.status(200).json({
        checkout,
        success: true,
      });
    } else {
      return res.status(200).json({ message: "not paid yet" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/final-checkout/:id", isAuthenticated, async (req, res) => {
  try {
    const checkout = await checkoutmodel.findById({ _id: req.params.id });
    if (!checkout) return res.status(404).json({ error: "checkout not found" });
    if (checkout.isPaid && !checkout.isFinalized) {
      const finalorder = await ordermodel.create({
        userId: checkout.userId,
        products: checkout.products,
        shippingaddress: checkout.shippingaddress,
        totalamount: checkout.totalamount,
        paymentmethod: checkout.paymentmethod,
        isPaid: true,
        paymentStatus: "paid",
        isDelivered: false,
        paidAt: checkout.paidAt,
        paymentDetails: checkout.paymentDetails,
      });
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      checkout.save();
      await cartmodel.findOneAndDelete({ userId: checkout.userId });
      return res.status(200).json({
        finalorder,
        success: true,
      });
    } else if (checkout.isFinalized) {
      return res.status(200).json({ message: "already finalized" });
    } else {
      return res.status(200).json({ message: "not paid" });
    }
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
