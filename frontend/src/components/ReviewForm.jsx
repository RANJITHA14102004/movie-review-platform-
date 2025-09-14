// frontend/src/components/ReviewForm.jsx
import { useState } from "react";
import axiosInstance from "../api/axios";

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      setError("Review text cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axiosInstance.post(`/movies/${movieId}/reviews`, {
        rating: Number(rating),
        reviewText: reviewText.trim(),
      });

      setRating(5);
      setReviewText("");
      if (onReviewAdded) onReviewAdded(); // Refresh reviews
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-2">
        <label className="block font-medium">Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-20 p-1 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block font-medium">Review:</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full p-2 border rounded resize-none"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
