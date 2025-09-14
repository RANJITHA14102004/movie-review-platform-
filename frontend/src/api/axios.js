// frontend/src/api/axios.js
import axios from "axios";

// Base API URL from environment variables or fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Unauthorized, force logout
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/login";
      }

      // Optionally log other errors
      console.error(
        `API Error [${error.response.status}]:`,
        error.response.data
      );
    } else {
      console.error("API Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
