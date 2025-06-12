const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermodel = require("../Models/usermodel");
const { isAuthenticated, isAdmin } = require("../Middleware/isAuthenticated");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ error: "All fields are required", success: false });
  }
  const user = await usermodel.findOne({ email: email });
  if (user) {
    return res.json({ error: "email already exist", success: false });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const newuser = await usermodel.create({
    name,
    email,
    password: hashedpassword,
  });
  await newuser.save();
  const payload = { _id: newuser._id, role: newuser.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: "Registered successfully",
      user: newuser,
      token,
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
    const payload = { _id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
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
router.put("/updateprofile", isAuthenticated, async (req, res) => {
  try {
    
    const userId = req.user._id;
    const user = await usermodel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/alluser", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await usermodel.find({ _id: { $ne: req.user._id } });
    res.json({ success: true, message: "all users", users });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/logout", (req, res) => {
  return res
    .clearCookie("token")
    .json({ success: true, message: "Logged Out Successfully" });
});

module.exports = router;
