const mongoose = require("mongoose");

const orderitemschema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
      trim: true,
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
  },
  { _id: false }
);

const orderschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [orderitemschema],
    shippingaddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalcode: {
        type: Number,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    totalamount: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentmethod: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    status:{
        type:String,
        enum:["processing","cancelled","shipped","delivered"],
        default:"processing"
    }
  },
  { timestamps: true }
);

const ordermodel = mongoose.model("Order", orderschema);
module.exports = ordermodel;
