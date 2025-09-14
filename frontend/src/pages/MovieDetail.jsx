// frontend/src/pages/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import ReviewForm from "../components/ReviewForm";
import { useAuth } from "../contexts/AuthContext";

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get(`/movies/${id}`);
      setMovie(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching movie:", err);
      setError("Failed to load movie details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const handleAddWatchlist = async () => {
    if (!user) return alert("Please login to add to watchlist");

    try {
      await axiosInstance.post(`/users/${user._id}/watchlist`, { movieId: movie._id });
      alert("Added to watchlist!");
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      alert("Failed to add to watchlist.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading movie details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!movie) return <p className="text-center mt-10">Movie not found.</p>;

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title || "Untitled Movie"}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow"
        />
        <div className="flex-1 space-y-2">
          <p><strong>Genre:</strong> {movie.genre || "N/A"}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear || "Unknown"}</p>
          <p><strong>Director:</strong> {movie.director || "Unknown"}</p>
          <p><strong>Cast:</strong> {movie.cast?.join(", ") || "Unknown"}</p>
          <p><strong>Average Rating:</strong> {movie.averageRating || "N/A"}</p>

          {user && (
            <button
              onClick={handleAddWatchlist}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add to Watchlist
            </button>
          )}
        </div>
      </div>

      {/* Trailer */}
      {movie.trailerId && (
        <div className="mt-6">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${movie.trailerId}`}
            title="YouTube video player"
            allowFullScreen
            className="rounded shadow"
          ></iframe>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Reviews</h2>
        {Array.isArray(movie.reviews) && movie.reviews.length > 0 ? (
          movie.reviews.map((rev) => (
            <div key={rev._id} className="border p-2 mb-2 rounded shadow-sm">
              <p><strong>{rev.user?.username || "Anonymous"}</strong> ⭐ {rev.rating}</p>
              <p>{rev.reviewText}</p>
              <p className="text-sm text-gray-500">{new Date(rev.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}

        {user && (
          <ReviewForm movieId={movie._id} onReviewAdded={fetchMovie} />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
