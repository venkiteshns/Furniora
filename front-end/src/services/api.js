import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

// Request interceptor to add JWT token from localStorage/Redux to headers
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedInfo = JSON.parse(userInfo);
            config.headers.Authorization = `Bearer ${parsedInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optionally handle auto-logout here if token expires
            console.error('Unauthorized. Token might be expired.');
            // We could dispatch a logout action from store but avoiding circular dependency is better
        }
        return Promise.reject(error);
    }
);

export default api;
