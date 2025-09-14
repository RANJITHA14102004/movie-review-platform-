import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieList from "./pages/MovieList"; // 👈 added
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Header / Navigation */}
        <Header />

        {/* Main content */}
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/list" element={<MovieList />} /> {/* 👈 added route */}
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
