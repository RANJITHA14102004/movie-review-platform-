// backend/controllers/recommendationController.js
const Movie = require("../models/Movie");
const Review = require("../models/Review");
const User = require("../models/User");

/**
 * @desc    Get movie recommendations for a user
 * @route   GET /api/recommendations/:userId
 * @access  Private
 */
const getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1️⃣ Fetch all reviews by the user
    const userReviews = await Review.find({ user: userId }).populate("movie");
    const ratedMovieIds = userReviews.map((r) => r.movie._id.toString());

    // 2️⃣ Identify genres the user likes
    const likedGenres = userReviews.map((r) => r.movie.genre);
    const genreCounts = likedGenres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});
    const favoriteGenres = Object.keys(genreCounts).sort(
      (a, b) => genreCounts[b] - genreCounts[a]
    );

    // 3️⃣ Fetch all movies not rated by the user
    const unratedMovies = await Movie.find({ _id: { $nin: ratedMovieIds } });

    // 4️⃣ Sort by favorite genres first, then by average rating
    const recommended = unratedMovies
      .sort((a, b) => {
        const genreScoreA = favoriteGenres.indexOf(a.genre) !== -1 ? 1 : 0;
        const genreScoreB = favoriteGenres.indexOf(b.genre) !== -1 ? 1 : 0;
        if (genreScoreA !== genreScoreB) return genreScoreB - genreScoreA;
        return b.averageRating - a.averageRating;
      })
      .slice(0, 10); // Top 10 recommendations

    res.json({ success: true, data: recommended });
  } catch (err) {
    console.error("Recommendation Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch recommendations" });
  }
};

module.exports = { getRecommendations };
