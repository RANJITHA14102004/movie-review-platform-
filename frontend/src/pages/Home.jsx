// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch featured movies
        const resFeatured = await axiosInstance.get("/movies?featured=true");
        // Fetch trending movies (sorted by averageRating or recent reviews)
        const resTrending = await axiosInstance.get("/movies?sort=trending");

        setFeatured(resFeatured.data.data || []);
        setTrending(resTrending.data.data || []);
      } catch (err) {
        console.error("Error loading movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading homepage...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="px-4 md:px-10 py-6">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white p-10 rounded-lg mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">🎬 Welcome to Movie Review Platform</h1>
        <p className="text-lg">Discover, Review, and Rate Your Favorite Movies</p>
      </section>

      {/* Featured Movies */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🌟 Featured Movies</h2>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p>No featured movies found.</p>
        )}
      </section>

      {/* Trending Movies */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🔥 Trending Now</h2>
        {trending.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trending.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p>No trending movies right now.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
