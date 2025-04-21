const mongoose = require("mongoose");

const cartschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalcartamount:{
    type:Number,
    required:true
  }
});

const cartmodel = mongoose.model("Cart", cartschema);
module.exports = cartmodel;
