const express = require("express");
const {isAuthenticated} = require("../Middleware/isAuthenticated");
const usermodel = require("../Models/usermodel");
const ordermodel = require("../Models/ordermodel");
const router = express.Router();

// CREATE ordermodel
router.post("/create-order", isAuthenticated, async (req, res) => {
  try {
    const userId = req.id;
    // const { totalamount } = req.body;
    const user = await usermodel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    //    return res.send(user);
    const order = await ordermodel.create({
      userId: user._id,
      cart:user.cart
    });
    await order.save();
    await user.orders.push(order);

    await user.save();
    return res.status(201).json({
      success: true,
      message: "order created successfully",
      order,
      user
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create ordermodel" });
  }
});

// GET ALL ordermodelS (Admin)
router.get("/allorder", isAuthenticated, async (req, res) => {
  try {
    const orders = await ordermodel
      .find()
      .populate("userId", "name email")
      .populate("products");
    return res
      .status(200)
      .json({ success: true, message: "all orders", orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ordermodels" });
  }
});

// GET ordermodel BY USER ID (User's ordermodels)
router.get("/userorder", isAuthenticated, async (req, res) => {
  try {
    const ordermodels = await ordermodel
      .find({ userId: req.id })
      .populate("products");
    res.status(200).json(ordermodels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user ordermodels" });
  }
});

// DELETE ordermodel (Admin or User)
router.delete("/order/:orderId", isAuthenticated, async (req, res) => {
  try {
    await ordermodel.findByIdAndDelete(req.params.orderId);
    res.status(200).json({ message: "ordermodel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete ordermodel" });
  }
});

module.exports = router;
