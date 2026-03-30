import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if backend port changes
  headers: {
    'Content-Type': 'application/json',
  },
});

export const IMAGE_BASE_URL = 'http://localhost:5000'; // Base URL for static assets

// Add a request interceptor to include the token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if server is down (Network Error) or returned 503 Service Unavailable
    if (error.message === 'Network Error' || (error.response && error.response.status === 503)) {
      if (window.location.pathname !== '/maintenance') {
        window.location.href = '/maintenance';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
