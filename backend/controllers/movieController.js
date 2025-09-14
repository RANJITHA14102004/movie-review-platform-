// backend/controllers/movieController.js
const Movie = require("../models/Movie");
const Review = require("../models/Review");
const User = require("../models/User");

// @desc    Get all movies (with advanced filters & pagination)
// @route   GET /movies
// @access  Public
exports.getMovies = async (req, res, next) => {
  try {
    const {
      search,
      genre,
      year,
      minRating,
      maxRating,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Search by title (case-insensitive)
    if (search) filter.title = { $regex: search, $options: "i" };

    // Filter by genre (supports multiple genres)
    if (genre) filter.genre = { $in: genre.split(",") };

    // Filter by release year
    if (year) filter.releaseYear = Number(year);

    // Filter by rating range
    if (minRating || maxRating) {
      filter.averageRating = {};
      if (minRating) filter.averageRating.$gte = Number(minRating);
      if (maxRating) filter.averageRating.$lte = Number(maxRating);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [movies, total] = await Promise.all([
      Movie.find(filter)
        .sort({ averageRating: -1, createdAt: -1 }) // trending first
        .skip(skip)
        .limit(Number(limit)),
      Movie.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: movies,
      meta: {
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        totalMovies: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single movie with reviews
// @route   GET /movies/:id
// @access  Public
exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate({
      path: "reviews",
      populate: { path: "user", select: "username email profilePicture" },
    });

    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    res.json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new movie (admin only)
// @route   POST /movies
// @access  Private/Admin
exports.addMovie = async (req, res, next) => {
  try {
    const { title, genre, releaseYear, director, cast, synopsis, posterUrl } =
      req.body;

    if (!title || !genre || !releaseYear) {
      return res
        .status(400)
        .json({ success: false, message: "Title, genre, and year are required" });
    }

    const movie = await Movie.create({
      title,
      genre,
      releaseYear,
      director,
      cast,
      synopsis,
      posterUrl,
    });

    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

// @desc    Add review to movie
// @route   POST /movies/:id/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
  try {
    const { rating, reviewText } = req.body;
    const movieId = req.params.id;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Rating must be 1–5 stars" });
    }

    // Create review
    const review = await Review.create({
      user: userId,
      movie: movieId,
      rating,
      reviewText,
    });

    // Push review into user's review history
    await User.findByIdAndUpdate(userId, { $push: { reviews: review._id } });

    // Recalculate movie average rating
    const reviews = await Review.find({ movie: movieId });
    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { averageRating: avgRating },
      { new: true }
    ).populate({
      path: "reviews",
      populate: { path: "user", select: "username email profilePicture" },
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: { review, movie: updatedMovie },
    });
  } catch (error) {
    next(error);
  }
};
