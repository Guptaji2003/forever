const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({
      message: "Token verification failed",
      success: false,
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "You are not authorized as admin" });
  }
};

module.exports = { isAuthenticated, isAdmin };
