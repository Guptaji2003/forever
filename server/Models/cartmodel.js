const mongoose = require("mongoose");

const cartitemschema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: [
    {
      url: {
        type: String,
        required: true,
      },
      alttext: {
        type: String,
        default: "product image",
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
},{_id:false});

const cartschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [cartitemschema],
    totalcartamount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const cartmodel = mongoose.model("Cart", cartschema);
module.exports = cartmodel;
