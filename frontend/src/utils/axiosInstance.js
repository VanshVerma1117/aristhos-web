import axios from 'axios';

// This instance is ONLY for your backend API
const apiClient = axios.create({
  // Use Vite environment variables, fallback to localhost strictly for dev safety
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  withCredentials: true, // Only sends cookies to YOUR backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;