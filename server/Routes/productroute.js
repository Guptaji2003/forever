const express = require("express");
const router = express.Router();
const productmodel = require("../Models/productmodel");
const { isAuthenticated, isAdmin } = require("../Middleware/isAuthenticated");

router.get("/allproduct", isAuthenticated, async (req, res) => {
  try {
    const products = await productmodel.find();
    return res.status(200).json({
      products,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/createproduct", isAuthenticated, isAdmin, async (req, res) => {
  const { name, price, image, category, description, size, color } = req.body;

  const product = await productmodel.create({
    name,
    price,
    image,
    category,
    description,
    color,
    size,
  });
  await product.save();

  res.json({
    message: "product create successfully",
    success: true,
    product,
  });
});
router.put("/updateproduct/:id", isAuthenticated, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const { name, price, image, category, description, size, color } = req.body;
  const product = await productmodel.findById(productId);
  if (name) product.name = name;
  if (price) product.price = price;
  if (image) product.image = image;
  if (category) product.category = category;
  if (description) product.description = description;
  if (color) product.color = color;
  if (size) product.size = size;
  await product.save();
  return res.status(401).json({ message: "updated this product", product });
});
router.delete("/deleteproduct/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productmodel.findById(productId);
    await productmodel.findByIdAndDelete(productId);
    res.json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/singleproduct/:id", isAuthenticated, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productmodel.findById(productId);
    res.json({
      success: true,
      message: "single Product fetch successfully",
      product,
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/newarrivals", isAuthenticated, async (req, res) => {
  try {
    const products = await productmodel.find().sort({ createdAt: -1 }).limit(8);
    res.json({
      success: true,
      message: "new arrivals fetch successfully",
      products,
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/relatedproducts/:id", isAuthenticated, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productmodel.findById(productId);
    const products = await productmodel.find({
      _id: { $ne: productId },
      category: product.category,
    });
    res.json({
      success: true,
      message: "related Product fetch successfully",
      products,
    }); 
  } catch (err) {
    console.log(err);
  }
});
router.get("/filter", isAuthenticated, async (req, res) => {
  try {
    const { category, minprice, maxprice, search, sort } = req.query;
    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (minprice || maxprice) {
      filter.price = {};
      if (minprice) filter.price.$gte = Number(minprice);
      if (maxprice) filter.price.$lte = Number(maxprice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortoption={};
    if(sort){
      const fields=sort.split(",");
      fields.forEach(field => {
        sortoption[field.replace('-','')]=field.startsWith('-')?-1:1;
      });
    }

    const products=await productmodel.find(filter).sort(sortoption);
    res.json({
      success: true,
      message: "related Product fetch successfully",
      products,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
