/* import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:4000", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
 */
