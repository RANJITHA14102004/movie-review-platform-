import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card border rounded-lg shadow-md p-4 transform transition duration-300 hover:scale-105">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
      <p className="text-yellow-500 mb-2">⭐ {movie.averageRating || "N/A"}</p>
      <Link
        to={`/movies/${movie._id}`}
        className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Details
      </Link>
    </div>
  );
};

export default MovieCard;
