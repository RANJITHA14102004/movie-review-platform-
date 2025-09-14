const express = require("express");
const router = express.Router();

// Controllers
const {
  getMovies,
  getMovieById,
  addMovie,
  addReview,
} = require("../controllers/movieController");

// Middleware
const { protect } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin"); // ✅ must be destructured correctly

// @route   GET /api/movies
// @desc    Get all movies (supports search, filters & pagination)
// @access  Public
router.get("/", getMovies);

// @route   GET /api/movies/:id
// @desc    Get single movie by ID (includes reviews with user info)
// @access  Public
router.get("/:id", getMovieById);

// @route   POST /api/movies
// @desc    Add a new movie (admin only)
// @access  Private/Admin
router.post("/", protect, isAdmin, addMovie);

// @route   POST /api/movies/:id/reviews
// @desc    Add a review for a movie
// @access  Private (logged-in users only)
router.post("/:id/reviews", protect, addReview);

module.exports = router;
