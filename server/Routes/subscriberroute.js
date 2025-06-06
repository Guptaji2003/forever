const express = require("express");
const subscribermodel = require("../Models/subscribermodel");
const router = express.Router();

router.post("/subscriber", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ error: "Field is required", success: false });
  }

  try {
    let subscriber = await subscribermodel.findOne({ email: email });

    if (subscriber) {
      return res.json({ error: "exist already", success: false });
    }

    subscriber = new subscribermodel({ email });
    await subscriber.save();

    res.json({
      message: "Subscribe Successfully",
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "subscribe failed", details: err.message });
  }
});

module.exports = router;
