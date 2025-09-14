import { useState, useEffect } from "react";
import axios from "../api/axios";

const WatchlistButton = ({ movieId }) => {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const res = await axios.get("/users/watchlist");
        setInWatchlist(res.data.some((m) => m._id === movieId));
      } catch (error) {}
    };
    checkWatchlist();
  }, [movieId]);

  const toggleWatchlist = async () => {
    try {
      if (inWatchlist) {
        await axios.delete(`/users/watchlist/${movieId}`);
      } else {
        await axios.post(`/users/watchlist`, { movieId });
      }
      setInWatchlist(!inWatchlist);
    } catch (error) {}
  };

  return (
    <button onClick={toggleWatchlist}>
      {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
};

export default WatchlistButton;
