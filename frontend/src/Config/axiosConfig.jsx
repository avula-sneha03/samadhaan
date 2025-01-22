// axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Set your base URL here
});

// Set up request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Check if the request is for login or signup
        if (!config.url.includes('/login') && !config.url.includes('/register')) {
            const token = localStorage.getItem('jwt');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Set up response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('jwt');
            // Handle redirection to login if needed
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;