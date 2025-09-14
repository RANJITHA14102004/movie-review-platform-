const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    director: { type: String, required: true },
    cast: [{ type: String }],
    synopsis: { type: String },
    posterUrl: { type: String },
    averageRating: { type: Number, default: 0 },
    trailerId: { type: String }, // ✅ optional trailer (YouTube ID)
  },
  { timestamps: true } // ✅ adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Movie", movieSchema);
