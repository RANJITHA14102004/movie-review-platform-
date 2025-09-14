const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// To prevent duplicate entries (same user adding the same movie multiple times)
watchlistSchema.index({ user: 1, movie: 1 }, { unique: true });

module.exports = mongoose.model("Watchlist", watchlistSchema);
