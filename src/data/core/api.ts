/**
 * Axios API Configuration
 * Centralized API client with interceptors for authentication
 */

import axios from "axios";

// Token key for localStorage
export const TOKEN_KEY = "posyandu_auth_token";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - clear token and redirect
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      // Optional: redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
