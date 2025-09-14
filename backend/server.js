// server.js
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/users");
const socialRoutes = require("./routes/social");
const recommendationRoutes = require("./routes/recommendationRoutes"); // ✅ Corrected path
const adminRoutes = require("./routes/admin"); // Admin dashboard (optional)

// Middleware
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { apiLimiter, authLimiter } = require("./middleware/rateLimit"); // Rate limiting

// Socket
const { initSocket } = require("./socket");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app); // Needed for socket.io

// -------------------
// Middleware
// -------------------
app.use(cors());
app.use(express.json());

// Apply general API rate limiter
app.use("/api/", apiLimiter);

// Apply stricter limiter to auth routes
app.use("/api/auth", authLimiter);

// -------------------
// API Routes
// -------------------
app.use("/api/auth", authRoutes);                 // Auth: register, login
app.use("/api/movies", movieRoutes);             // Movies: list, details, add, reviews
app.use("/api/users", userRoutes);               // Users: profile, watchlist
app.use("/api/social", socialRoutes);            // Social: follow, followed-reviews
app.use("/api/recommendations", recommendationRoutes); // Movie recommendations
app.use("/api/admin", adminRoutes);              // Admin dashboard (optional)

// -------------------
// Root Endpoint
// -------------------
app.get("/", (req, res) => {
  res.send("🎬 Movie Review Platform API is running!");
});

// -------------------
// Error Handling
// -------------------
app.use(notFound);     // 404 handler
app.use(errorHandler); // centralized error handler

// -------------------
// Socket.io Initialization
// -------------------
initSocket(server); // Initialize socket.io for real-time notifications

// -------------------
// Start Server
// -------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
