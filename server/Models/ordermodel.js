const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
 
});

const ordermodel = mongoose.model("Order", orderschema);
module.exports = ordermodel;
