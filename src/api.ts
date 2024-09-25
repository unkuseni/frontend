import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3500", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
