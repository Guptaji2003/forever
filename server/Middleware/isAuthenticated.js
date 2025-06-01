const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid",
        success: false,
      });
    }
    req.user = decode;
    
    next();
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).send({ message: "You are not authorize..." });
  }
};

module.exports = {isAuthenticated,isAdmin};
