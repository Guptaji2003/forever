const express = require("express");
const router = express.Router();
const productmodel = require("../Models/productmodel");
const { isAuthenticated, isAdmin } = require("../Middleware/isAuthenticated");
const cartmodel = require("../Models/cartmodel");
const ordermodel = require("../Models/ordermodel");

router.get("/allorders", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const orders = await ordermodel.find().sort({createdAt:-1}).populate("userId","name email");
    if (!orders) return res.status(400).send({ message: "no orders" });

    return res.status(200).json({
      orders,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/user-orders", isAuthenticated, async (req, res) => {
  try {
    const orders = await ordermodel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    if (!orders) return res.status(400).send({ message: "no orders" });

    return res.status(200).json({
      orders,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/order/:id", isAuthenticated, async (req, res) => {
  try {
    const order = await ordermodel.findOne({ _id: req.params.id });
    if (!order) return res.status(400).send({ message: "no order" });

    return res.status(200).json({
      order,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateorder/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await ordermodel.findById(req.params.id);
    if (status) {
      order.status = status;
      if (status === "delivered") {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
    }

    await order.save();
    return res.status(200).json({
      order,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/deleteorder/:id", isAuthenticated, async (req, res) => {
  try {
    const order = await ordermodel.findById(req.params.id);
    if (!order) return res.send({ message: "no order found" });
    order.deleteOne();
    return res.status(200).json({
      message: "order removed",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
