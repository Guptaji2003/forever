// seed.js
const mongoose = require("mongoose");
const productmodel = require("./Models/productmodel");
const seeddata = require("./sample data/sampledata");

require("dotenv").config(); // if you're using .env file
const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    // await productmodel.deleteMany(); // optional: clear existing data
    await productmodel.insertMany(seeddata);

    console.log("Seeding done!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
