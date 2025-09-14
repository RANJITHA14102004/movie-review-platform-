const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");

const User = require("../models/User");
const Movie = require("../models/Movie");
const Review = require("../models/Review");

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    console.log("🌱 Seeding database...");

    // Clear old data
    await User.deleteMany();
    await Movie.deleteMany();
    await Review.deleteMany();

    // Create sample users
    const users = await User.insertMany([
      {
        username: "john_doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    ]);

    console.log("✅ Users seeded");

    // Create sample movies
    const movies = await Movie.insertMany([
      {
        title: "Inception",
        genre: "Sci-Fi",
        releaseYear: 2010,
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        synopsis: "A thief enters dreams to steal secrets.",
        posterUrl: "https://image.tmdb.org/t/p/inception.jpg",
        averageRating: 4.8,
      },
      {
        title: "The Dark Knight",
        genre: "Action",
        releaseYear: 2008,
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        synopsis: "Batman battles the Joker for Gotham's soul.",
        posterUrl: "https://image.tmdb.org/t/p/dark-knight.jpg",
        averageRating: 4.9,
      },
    ]);

    console.log("✅ Movies seeded");

    // Create sample reviews
    await Review.insertMany([
      {
        user: users[0]._id,
        movie: movies[0]._id,
        rating: 5,
        reviewText: "Mind-blowing movie! Nolan at his best.",
      },
      {
        user: users[1]._id,
        movie: movies[1]._id,
        rating: 4,
        reviewText: "Ledger’s Joker is legendary!",
      },
    ]);

    console.log("✅ Reviews seeded");

    console.log("🎉 Database seeding completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seed();
