// const BACKEND_URL="https://itube-iser.onrender.com"
const BACKEND_URL="http://localhost:8000"

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
            console.error("Token refresh failed. Redirecting to login...");
        }
    }

    return Promise.reject(error);
};

const requestInterceptor = async (request) => {
    try {
        const user = await UserSevice.getCurrentUser();
        // console.log(user.status)
        request.params = { ...request.params, isPublished: user.status >= 400, username: user?.data?.data?._id };
        return request;
    } catch (error) {
        console.error("Error at request interceptor:", error);
        return axios(request.originalRequest);
    }
};
const apiClient_getUser = axios.create({
    baseURL: `${BACKEND_URL}/api/v1/users`, // More general baseURL
    withCredentials: true,
});


const response_interceptor = axios.create({
    baseURL: `${BACKEND_URL}/api/v1`, // More general baseURL
    withCredentials: true,
});
const apiClient2 = axios.create({
    baseURL: `${BACKEND_URL}/api/v1/videos`,
    withCredentials: true,
});

response_interceptor.interceptors.response.use(response => response, responseInterceptor)
apiClient_getUser.interceptors.response.use(response => response, responseInterceptor);
apiClient2.interceptors.request.use(requst => requestInterceptor(requst), error => Promise.reject(error));

export { apiClient_getUser, apiClient2, response_interceptor };
