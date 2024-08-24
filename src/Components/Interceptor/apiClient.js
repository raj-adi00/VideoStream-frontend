import axios from 'axios';
import UserSevice from '../Utility/User.js';

const responseInterceptor = async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshResponse = await UserSevice.refreshAccessToken();

        if (refreshResponse.accesToken) {
            originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.accesToken}`;

            return axios(originalRequest);
        } else {
            // Handle the case where refresh token fails
            console.error("Token refresh failed. Redirecting to login...");
            // Optionally, redirect to login
            // window.location.href = '/login';
        }
    }

    return Promise.reject(error);
};

const apiClient_getUser = axios.create({
    baseURL: '/api/v1/users', // More general baseURL
    withCredentials: true,
});

const apiClient2 = axios.create({
    baseURL: 'https://api2.example.com',
    withCredentials: true,
});

apiClient_getUser.interceptors.response.use(response => response, responseInterceptor);
apiClient2.interceptors.response.use(response => response, responseInterceptor);

export { apiClient_getUser, apiClient2 };
