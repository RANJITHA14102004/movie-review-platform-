// frontend/src/pages/MovieList.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "../api/axios";
import MovieCard from "../components/MovieCard";
import { motion, AnimatePresence } from "framer-motion";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & search
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  // Pagination / Infinite scroll
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  const observer = useRef();

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = { search, genre, year, minRating: rating, page, limit };
      const res = await axiosInstance.get("/movies", { params });
      const newMovies = res.data.data || [];
      const totalPages = res.data.meta?.totalPages || 1;

      setMovies((prev) => (page === 1 ? newMovies : [...prev, ...newMovies]));
      setHasMore(page < totalPages);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [search, genre, year, rating]);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, genre, year, rating]);

  const handleResetFilters = () => {
    setSearch("");
    setGenre("");
    setYear("");
    setRating("");
    setPage(1);
    setMovies([]);
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Movies</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-end justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1 md:flex-auto min-w-[200px]"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 rounded min-w-[120px]"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded w-32"
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={rating}
          min={1}
          max={5}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded w-32"
        />
        <button
          onClick={handleResetFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>

      {/* Loading/Error */}
      {error && <p className="text-center mt-10 text-red-500">{error}</p>}

      {/* Movies Grid with Framer Motion */}
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {movies.map((movie, index) => {
            const isLast = movies.length === index + 1;
            return (
              <motion.div
                key={movie._id}
                ref={isLast ? lastMovieElementRef : null}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {loading && <p className="text-center mt-10">Loading movies...</p>}
      {!loading && !hasMore && movies.length > 0 && (
        <p className="text-center mt-6 text-gray-500">You have reached the end.</p>
      )}
    </div>
  );
};

export default MovieList;
