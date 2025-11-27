// src/services/api.js - Production Ready

import axios from 'axios';

// Get API URL from environment variable (set in .env file)
// In development: http://localhost:8000
// In production: https://regcomplyai-production.onrender.com/
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('[API] Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 second timeout for long operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============ Request Interceptor ============
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

// ============ Response Interceptor ============
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 - unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optionally redirect to login
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('[API] Network error:', error.message);
      error.message = 'Network error. Please check your connection.';
    }
    
    return Promise.reject(error);
  }
);


// ============ Auth API ============

export const register = async (name, email, password, company = '') => {
  const response = await api.post('/api/auth/register', {
    name,
    email,
    password,
    company
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', {
    email,
    password
  });
  return response.data;
};

export const verifyToken = async (token) => {
  try {
    const response = await api.post('/api/auth/verify', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return { valid: false };
  }
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

export const updateProfile = async (updates) => {
  const response = await api.put('/api/auth/profile', updates);
  return response.data;
};


// ============ Document Analysis API ============

export const analyzeDocument = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post('/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minute timeout for file uploads
      onUploadProgress: onProgress ? (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      } : undefined,
    });
    
    return response.data;
  } catch (error) {
    console.error('[API] Analysis error:', error);
    throw new Error(error.response?.data?.detail || 'Analysis failed. Please try again.');
  }
};

export const analyzeProfile = async (profileData) => {
  try {
    const response = await api.post('/api/analyze-profile', profileData);
    return response.data;
  } catch (error) {
    console.error('[API] Profile analysis error:', error);
    throw new Error(error.response?.data?.detail || 'Profile analysis failed. Please try again.');
  }
};


// ============ Chat API ============

export const sendChatMessage = async (message) => {
  try {
    const response = await api.post('/api/chat', { message });
    return response.data.response;
  } catch (error) {
    console.error('[API] Chat error:', error);
    throw new Error(error.response?.data?.detail || 'Failed to get response');
  }
};


// ============ Health Check ============

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export default api;