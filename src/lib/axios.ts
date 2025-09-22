import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

// Create axios instance
const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s timeout
});

// ✅ Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Example: attach token
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log(
    //   `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
    //   config.data || ""
    // );
    return config;
  },
  (error) => {
    // console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    console.log("[API Response]", response.data);
    return response; // Return the full response object
  },
  (error) => {
    console.error("[API Response Error]", error.response || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosClient;
