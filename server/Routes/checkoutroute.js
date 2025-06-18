const express = require("express");
const router = express.Router();
const productmodel = require("../Models/productmodel");
const { isAuthenticated, isAdmin } = require("../Middleware/isAuthenticated");
const cartmodel = require("../Models/cartmodel");
const checkoutmodel = require("../Models/checkoutmodel");
const ordermodel = require("../Models/ordermodel");

// Optional: PhonePe integration logic
const { initiatePhonePePayment } = require("../utils/phonepe"); // create this util

// 1️⃣ Create Checkout Route
router.post("/create-checkout", isAuthenticated, async (req, res) => {
  try {
    const { products, shippingaddress, totalamount, paymentmethod } = req.body;
    const userId = req.user._id;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products for checkout" });
    }

    if (
      !shippingaddress ||
      !shippingaddress.city ||
      !shippingaddress.address ||
      !shippingaddress.postalcode ||
      !shippingaddress.state
    ) {
      return res.status(400).json({ message: "Incomplete shipping address" });
    }

    // Create checkout entry
    const checkout = await checkoutmodel.create({
      userId,
      products,
      shippingaddress,
      totalamount,
      paymentmethod,
    });

    // Handle PhonePe payment
    if (paymentmethod === "PhonePe") {
      const redirectUrl = await initiatePhonePePayment(checkout._id, totalamount, userId);
      return res.status(200).json({
        checkout,
        success: true,
        paymentInitiated: true,
        redirectUrl,
      });
    }

    // For UPI/COD, no redirection needed
    return res.status(200).json({
      checkout,
      success: true,
    });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// 2️⃣ Update Checkout (after payment)
router.put("/update-checkout/:id", isAuthenticated, async (req, res) => {
  try {
    const { paymentStatus, paymentDetails } = req.body;
    const checkout = await checkoutmodel.findById(req.params.id);
    if (!checkout) return res.status(404).json({ error: "Checkout not found" });

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      return res.status(200).json({ checkout, success: true });
    } else {
      return res.status(200).json({ message: "Not paid yet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// 3️⃣ Finalize Checkout (create order + clear cart)
router.post("/final-checkout/:id", isAuthenticated, async (req, res) => {
  try {
    const checkout = await checkoutmodel.findById(req.params.id);
    if (!checkout) return res.status(404).json({ error: "Checkout not found" });

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
      await checkout.save();

      await cartmodel.findOneAndDelete({ userId: checkout.userId });

      return res.status(200).json({
        finalorder,
        success: true,
      });
    } else if (checkout.isFinalized) {
      return res.status(200).json({ message: "Already finalized" });
    } else {
      return res.status(200).json({ message: "Not paid yet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
