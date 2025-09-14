// backend/routes/auth.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(new Error(errors.array().map(err => err.msg).join(", ")));
  }
  next();
};

// @route   POST /api/auth/register
// @desc    Register new user (admin or casual user)
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("isAdmin").optional().isBoolean().withMessage("isAdmin must be boolean"),
    handleValidationErrors,
  ],
  registerUser
);

// @route   POST /api/auth/login
// @desc    Login user & return token
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors,
  ],
  loginUser
);

module.exports = router;
