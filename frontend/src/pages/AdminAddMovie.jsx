// AdminAddMovie.jsx
import React, { useState } from "react";
import axiosInstance from "../api/axios";

const AdminAddMovie = () => {
  const [movie, setMovie] = useState({
    title: "", genre: "", releaseYear: "", director: "", cast: "", synopsis: "", posterUrl: ""
  });

  const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/admin/movies", movie, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Movie added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding movie");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      {Object.keys(movie).map((key) => (
        <input
          key={key}
          name={key}
          value={movie[key]}
          onChange={handleChange}
          placeholder={key}
          className="border p-2 w-full mb-2 rounded"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Movie</button>
    </form>
  );
};

export default AdminAddMovie;
