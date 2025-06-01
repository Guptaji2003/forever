const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  }
});

const usermodel = mongoose.model("User", userschema);
module.exports = usermodel;
