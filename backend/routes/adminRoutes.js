// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const User = require("../models/User");

// Middleware to check admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ message: "Admin only" });
};

router.use(isAdmin);

// Add movie
router.post("/movies", async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json({ success: true, data: movie });
});

// Update movie
router.put("/movies/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: movie });
});

// Delete movie
router.delete("/movies/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Movie deleted" });
});

// List all users
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, data: users });
});

module.exports = router;
