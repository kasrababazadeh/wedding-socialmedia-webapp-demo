import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // if using cookies
});

// Request interceptor (e.g., attach auth token)
instance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor (e.g., handle errors)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    return Promise.reject(error);
  }
);

export default instance;