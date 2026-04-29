import axios from 'axios';
import { errorHandler } from './errorHandler';

const API_BASE_URL = 'http://localhost:3000'; // Placeholder
const REFRESH_TOKEN_URL = import.meta.env.VITE_REFRESH_TOKEN_URL || `${API_BASE_URL}/api/v1/auth/refresh`;

// Token Management Helpers (Local vs Session Storage)
const getAccessToken = () => {
  let token = JSON.parse(localStorage.getItem('accessToken'));
  if (!token) token = JSON.parse(sessionStorage.getItem('accessToken'));
  return token || null;
};

const getRefreshToken = () => {
  let token = localStorage.getItem('refreshToken');
  if (!token) token = sessionStorage.getItem('refreshToken');
  return token || null;
};

const setTokens = (access, refresh) => {
  localStorage.setItem('accessToken', JSON.stringify(access));
  localStorage.setItem('refreshToken', refresh);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // Handle ngrok warning pages
  },
});

// Request Interceptor: Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = token; // Align with user's snippet logic
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Detect 401 and try to refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const storedRefreshToken = getRefreshToken();

      if (storedRefreshToken) {
        try {
          const response = await axios.post(REFRESH_TOKEN_URL, {
            refreshToken: storedRefreshToken,
          });

          if (response.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } = response.data;
            setTokens(accessToken, newRefreshToken);
            
            // Update original request header and retry
            originalRequest.headers.Authorization = accessToken;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
          clearTokens();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const apiMethods = {
  get: async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  post: async (url, data = {}) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  setAuthTokens: (access, refresh) => setTokens(access, refresh),
  logout: () => {
    clearTokens();
    window.location.href = '/login';
  }
};
