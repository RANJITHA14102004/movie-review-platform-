// backend/controllers/socialController.js
const User = require("../models/User");
const Review = require("../models/Review");

const followUser = async (req, res) => {
  const { userId, targetUserId } = req.params; 
  try {
    const user = await User.findById(userId);
    if (!user.following.includes(targetUserId)) {
      user.following.push(targetUserId);
      await user.save();
    }
    res.json({ success: true, message: "User followed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get reviews from followed users
const getFollowedReviews = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    const followedIds = user.following || [];

    const reviews = await Review.find({ user: { $in: followedIds } })
      .populate("movie", "title posterUrl")
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { followUser, getFollowedReviews };
