const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
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
    type: [String],
  },
  size: {
    type: [String],
  },
});

const productmodel = mongoose.model("Product", productschema);
module.exports = productmodel;
