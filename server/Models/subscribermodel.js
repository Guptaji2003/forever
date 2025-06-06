const mongoose = require("mongoose");

const subscriberschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscribeAt: {
    type: Date,
    default: Date.now(),
  },
});

const subscribermodel = mongoose.model("Subscriber", subscriberschema);
module.exports = subscribermodel;