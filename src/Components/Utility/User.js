const BACKEND_URL="https://itube-iser.onrender.com"
// const BACKEND_URL='http://localhost:8000'


import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiClient_getUser } from "../Interceptor/apiClient";
import handleAxiosError from "../Frequent/HandleAxiosError";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Store/authSlice";

export class User {
    err = {
        status: 401,
        message: "unsuccessfull attempt"
    }
    constructor() {

    }
    async getCurrentUser() {
        try {
            const currentUser = await apiClient_getUser.get(`/current-user`, { withCredentials: true });
            // console.log(currentUser);
            return currentUser;
        } catch (error) {
            console.log("Error at getCurrentUser", error.response);
            // Handle specific error cases here, if needed
            return error.response;
        }
    }


    async register(formDataobj) {
        try {
            const user = await axios.post(`${BACKEND_URL}/api/v1/users/register`, formDataobj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })
            console.log(user)
            return user
        } catch (error) {
            console.log("error at register", error)
            if (error.response) {
                console.log("Backend returned an error:", error.response.data.message);
                return error.response;
            } else if (error.request) {
                console.log("No response received from the backend", error.request);
                return { message: "No response from the server. Please try again later." };
            } else {
                console.log("Error setting up the request", error.message);
                return { message: "Request setup error: " + error.message };
            }
        }
    }


    async login(formData) {
        try {
            // const user = await axios.post('https://itube-iser.onrender.com/api/v1/users/login', formData, {
            const user = await axios.post(`${BACKEND_URL}/api/v1/users/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            return user
        } catch (error) {
            console.log("error at login", error.response)
            if (error.response) {
                console.log("Backend returned an error:", error.response.data.message);
                return error.response;
            } else if (error.request) {
                console.log("No response received from the backend", error.request);
                return { message: "No response from the server. Please try again later." };
            } else {
                console.log("Error setting up the request", error.message);
                return { message: "Request setup error: " + error.message };
            }
        }
    }

    async logout() {
        try {
            const user = await apiClient_getUser.post(`/logout`, {}, { withCredentials: true })
            console.log(user)
            return user
        } catch (error) {
            console.log("error at logout", error)
            if (error.response) {
                console.log("Backend returned an error:", error.response.data.message);
                return error.response;
            } else if (error.request) {
                console.log("No response received from the backend", error.request);
                return { message: "No response from the server. Please try again later." };
            } else {
                console.log("Error setting up the request", error.message);
                return { message: "Request setup error: " + error.message };
            }
        }
    }

    async refreshAccessToken() {
        try {
            const user = await axios.post(`${BACKEND_URL}/api/v1/users/refresh-token`, {}, { withCredentials: true })
            console.log(user)
            return user
        } catch (error) {
            console.log("error at refresh token", error)
            this.err.message = error?.message
            return this.err
        }
    }

    async updateWatchHistory(videoid) {
        try {
            const updateStatus = (await axios.patch(`${BACKEND_URL}/api/v1/users/watch-history/${videoid}`, {}, { withCredentials: true }))?.data
            if (updateStatus.statusCode == 200)
                return updateStatus
            else
                return (updateStatus?.message)
        } catch (error) {
            console.log(error)
            return handleAxiosError(error)
        }
    }

    async getUserChannel(username) {
        try {
            const channel = await axios.get(`${BACKEND_URL}/api/v1/users/c/${username}`, {withCredentials:true})
            console.log(channel)
            if (channel.status === 200)
                return channel.data
            else
                return handleAxiosError(channel)
        } catch (error) {
            console.log(error)
            return handleAxiosError(error)
        }
    }

}
const UserSevice = new User()
export default UserSevice