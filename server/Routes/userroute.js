const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermodel = require("../Models/usermodel");
const isAuthenticated = require("../Middleware/isAuthenticated");
const cartmodel = require("../Models/cartmodel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ error: "All fields are required", success: false });
  }
  const user = await usermodel.findOne({ email: email });
  if (user) {
    return res.json({ error: "email already exist", success: false });
  }

  const hashedpassword = await bcrypt.hash(password, 10);
  const newuser = await usermodel.create({
    name,
    email,
    password: hashedpassword,
  });
  await newuser.save();
  return res.json({
    message: "Registered successfully",
    user: newuser,
    success: true,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "All fields are required", success: false });
  }

  try {
    const user = await usermodel.findOne({ email: email });

    if (!user) {
      return res.json({ error: "Invalid email or password", success: false });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ error: "Invalid email or password", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login Successfully",
        success: true,
        user,
        token,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Login failed", details: err.message });
  }
});
// Correct way
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.userId)
      .populate('orders')
      .populate('whislist')
      .populate('cart');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get("/alluser", isAuthenticated, async (req, res) => {
  const users = await usermodel.find();
  res.json({ success: true, message: "all users", users });
});
router.get("/logout", (req, res) => {
  return res
    .clearCookie("token")
    .json({ success: true, message: "Logged Out Successfully" });
});

module.exports = router;
