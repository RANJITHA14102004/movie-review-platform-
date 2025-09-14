const express = require("express");
const router = express.Router();
const { getAllUsers, getAllMovies, deleteUser, deleteMovie } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/auth");

router.use(protect, admin);

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Movies
router.get("/movies", getAllMovies);
router.delete("/movies/:id", deleteMovie);

module.exports = router;
