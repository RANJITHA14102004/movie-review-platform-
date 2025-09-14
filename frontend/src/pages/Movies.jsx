// frontend/src/pages/Movies.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters / Search
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/movies?search=${search}&genre=${genre}&year=${year}&rating=${rating}&page=${page}`
        );
        const data = Array.isArray(res.data) ? res.data : res.data.movies || [];
        setMovies(data);

        // If backend returns totalPages
        if (res.data.totalPages) setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search, genre, year, rating, page]);

  if (loading) return <p>Loading movies...</p>;
  if (!movies.length) return <p>No movies found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Movies</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="border p-2 rounded">
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
        </select>

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        />

        <select value={rating} onChange={(e) => setRating(e.target.value)} className="border p-2 rounded">
          <option value="">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
          <option value="4">⭐⭐⭐⭐ (4+)</option>
          <option value="3">⭐⭐⭐ (3+)</option>
          <option value="2">⭐⭐ (2+)</option>
        </select>
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-2">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
