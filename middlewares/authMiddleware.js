const jwt = require("jsonwebtoken")
const User = require("../models/User") // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from database
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      })
    }

    // Add user to request object
    req.user = user
    next()
  } catch (error) {
    console.error("Auth Middleware Error:", error)
    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    })
  }
}

module.exports = authMiddleware
