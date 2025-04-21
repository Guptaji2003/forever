const express = require("express");
const productmodel = require("../Models/productmodel");
const isAuthenticated = require("../Middleware/isAuthenticated");
const usermodel = require("../Models/usermodel");
const router = express.Router();

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

router.post("/createproduct", isAuthenticated, async (req, res) => {
  const { name, price, image, category, description } = req.body;

  const product = await productmodel.create({
    name,
    price,
    image,
    category,
    description,
  });
  await product.save();

  res.json({
    message: "product create successfully",
    success: true,
    product,
  });
});

router.put("/updateproduct/:id", isAuthenticated, async (req, res) => {
  const productId = req.params.id;
  const { name, price, image, category, description } = req.body;
  const product = await productmodel.findById(productId);
  if (name) product.name = name;
  if (price) product.price = price;
  if (image) product.image = image;
  if (category) product.category = category;
  if (description) product.description = description;
  await product.save();
  return res.status(401).json({ message: "updated this product", product });
});

router.delete("/deleteproduct/:id", isAuthenticated, async (req, res) => {
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

// router.put("/addtocart/:id", isAuthenticated, async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const authorId = req.id;

//     const product = await productmodel.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ message: "product not found", success: false });
//     }

//     let user = await usermodel
//       .findById(authorId)
//       .populate({
//         path: "cart",
//         select: "name image price category description",
//       })
//       .populate({
//         path: "orders",
//         populate: {
//           path: "products",
//           select: "name image price category description",
//         },
//       })
//       .populate({
//         path: "whislist",
//         select: "name image price category description",
//       });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     const cartIds = user.cart.map((item) => item._id.toString());
//     if (cartIds.includes(product._id.toString())) {
//       // Remove from bookmarks
//       await usermodel.findByIdAndUpdate(authorId, {
//         $pull: { cart: product._id },
//       });
//     } else {
//       // Add to bookmarks
//       await usermodel.findByIdAndUpdate(authorId, {
//         $push: { cart: product._id },
//       });
//     }
//     await user.save();

//     return res.status(200).json({
//       message: cartIds.includes(product._id.toString())
//         ? "Product added to cart"
//         : "Product removed from cart",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// });

// router.put("/whislist/:id", isAuthenticated, async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const authorId = req.id;

//     const product = await productmodel.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ message: "product not found", success: false });
//     }

//     let user = await usermodel.findById(authorId)
//     .populate({
//       path: "cart",
//       select: "name image price category description",
//     })
//     .populate({
//       path: "orders",
//       populate: {
//         path: "products",
//         select: "name image price category description",
//       },
//     })
//     .populate({
//       path: "whislist",
//       select: "name image price category description",
//     });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     const whislister = user.whislist.map((item) => item._id.toString());

//     if (whislister.includes(product._id.toString())) {
//       // Remove from bookmarks
//       await usermodel.findByIdAndUpdate(authorId, {
//         $pull: { whislist: product._id },
//       });
//     } else {
//       // Add to bookmarks
//       await usermodel.findByIdAndUpdate(authorId, {
//         $push: { whislist: product._id },
//       });
//     }
//     await user.save();
//     return res.status(200).json({
//       message: user.whislist.includes(product._id)
//         ? "Product removed from whislist"
//         : "Product added to whislist",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// });

router.put("/addtocart/:id", isAuthenticated, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;

    const product = await productmodel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found", success: false });

    const user = await usermodel.findById(userId).populate("cart").populate("whislist").populate({path:"orders",populate:{path:"products"}});
    const cartItemIds = user?.cart?.map((item) => item._id.toString());

    const isInCart = cartItemIds?.includes(productId);

    await usermodel.findByIdAndUpdate(userId, {
      [isInCart ? "$pull" : "$push"]: { cart: productId },
    });

    const updatedUser = await usermodel.findById(userId).populate("cart").populate("whislist").populate({path:"orders",populate:{path:"products",select:"_id"}});

    res.status(200).json({
      message: isInCart ? "Product removed from cart" : "Product added to cart",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Toggle wishlist
router.put("/whislist/:id", isAuthenticated, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;

    const product = await productmodel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found", success: false });

    const user = await usermodel.findById(userId).populate("whislist").populate("cart").populate({path:"orders",populate:{path:"products"}});
    const wishlistIds = user.whislist.map((item) => item._id.toString());

    const isInWishlist = wishlistIds.includes(productId);

    await usermodel.findByIdAndUpdate(userId, {
      [isInWishlist ? "$pull" : "$push"]: { whislist: productId },
    });

    const updatedUser = await usermodel.findById(userId).populate("whislist").populate("cart").populate({path:"orders",populate:{path:"products"}});

    res.status(200).json({
      message: isInWishlist ? "Product removed from wishlist" : "Product added to wishlist",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
});


module.exports = router;
