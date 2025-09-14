const User = require("../models/User");
const Movie = require("../models/Movie");

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all movies
exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json({ success: true, data: movies });
  } catch (error) {
    next(error);
  }
};

// Delete movie
exports.deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};
