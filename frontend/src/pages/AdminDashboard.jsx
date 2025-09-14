import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const resUsers = await axiosInstance.get("/admin/users");
    const resMovies = await axiosInstance.get("/admin/movies");
    setUsers(resUsers.data.data);
    setMovies(resMovies.data.data);
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await axiosInstance.delete(`/admin/users/${id}`);
      fetchData();
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm("Delete this movie?")) {
      await axiosInstance.delete(`/admin/movies/${id}`);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Users</h2>
        {users.map((user) => (
          <div key={user._id} className="flex justify-between border p-2 mb-1 rounded">
            <span>{user.username} ({user.email})</span>
            <button onClick={() => handleDeleteUser(user._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Movies</h2>
        {movies.map((movie) => (
          <div key={movie._id} className="flex justify-between border p-2 mb-1 rounded">
            <span>{movie.title}</span>
            <button onClick={() => handleDeleteMovie(movie._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
