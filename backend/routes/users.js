// routes/users.js
const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @route   GET /api/users/:id
 * @desc    Get user profile + review history
 * @access  Private (logged-in users only)
 */
router.get("/:id", protect, getUserProfile);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user profile
 * @access  Private
 */
router.put("/:id", protect, updateUserProfile);

/**
 * @route   GET /api/users/:id/watchlist
 * @desc    Get user's watchlist (populated with movie objects)
 * @access  Private
 */
router.get("/:id/watchlist", protect, getWatchlist);

/**
 * @route   POST /api/users/:id/watchlist
 * @desc    Add a movie to user's watchlist
 * @access  Private
 */
router.post("/:id/watchlist", protect, addToWatchlist);

/**
 * @route   DELETE /api/users/:id/watchlist/:movieId
 * @desc    Remove a movie from user's watchlist
 * @access  Private
 */
router.delete("/:id/watchlist/:movieId", protect, removeFromWatchlist);

module.exports = router;
