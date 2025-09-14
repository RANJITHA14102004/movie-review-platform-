// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import MovieCard from "../components/MovieCard";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!user) return;

      // Fetch full user profile with reviews
      const resProfile = await axiosInstance.get(`/users/${user._id}`);
      setProfileData(resProfile.data.data || resProfile.data);

      // Fetch watchlist
      const resWatchlist = await axiosInstance.get(`/users/${user._id}/watchlist`);
      setWatchlist(resWatchlist.data.data || resWatchlist.data);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const removeFromWatchlist = async (movieId) => {
    try {
      await axiosInstance.delete(`/users/${user._id}/watchlist/${movieId}`);
      setWatchlist((prev) => prev.filter((movie) => movie._id !== movieId));
    } catch (err) {
      console.error("Error removing movie from watchlist:", err);
      alert("Failed to remove movie from watchlist.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!profileData) return <p className="text-center mt-10">User not found.</p>;

  return (
    <div className="p-4 md:p-10">
      {/* User Info */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{profileData.username}'s Profile</h1>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Joined:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</p>

      {/* Review History */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Review History</h2>
        {profileData.reviews?.length > 0 ? (
          profileData.reviews.map((rev) => (
            <div key={rev._id} className="border p-3 mb-2 rounded shadow-sm">
              <p><strong>{rev.movie?.title || "Unknown Movie"}</strong> ⭐ {rev.rating}</p>
              <p>{rev.reviewText}</p>
              <p className="text-sm text-gray-500">{new Date(rev.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Watchlist */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Watchlist</h2>
        {watchlist.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {watchlist.map((movie) => (
              <div key={movie._id} className="relative">
                <MovieCard movie={movie} />
                <button
                  onClick={() => removeFromWatchlist(movie._id)}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
