const User = require("../models/User");
const Review = require("../models/Review");

// @desc    Get user profile & review history
// @route   GET /users/:id
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const reviews = await Review.find({ user: req.params.id }).populate("movie");

    res.json({ success: true, user, reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /users/:id
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { username, email, profilePicture } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePicture = profilePicture || user.profilePicture;

    const updatedUser = await user.save();
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user watchlist
// @route   GET /users/:id/watchlist
exports.getWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("watchlist");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, watchlist: user.watchlist });
  } catch (error) {
    next(error);
  }
};

// @desc    Add movie to watchlist
// @route   POST /users/:id/watchlist
exports.addToWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      return res.status(400).json({ success: false, message: "Movie ID is required" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.json({ success: true, watchlist: user.watchlist });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove movie from watchlist
// @route   DELETE /users/:id/watchlist/:movieId
exports.removeFromWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const initialLength = user.watchlist.length;
    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== movieId
    );

    if (user.watchlist.length === initialLength) {
      return res.status(404).json({ success: false, message: "Movie not found in watchlist" });
    }

    await user.save();

    res.json({ success: true, watchlist: user.watchlist });
  } catch (error) {
    next(error);
  }
};
