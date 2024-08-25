import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiClient_getUser } from "../Interceptor/apiClient";

export class User {
    err = {
        status: 401,
        message: "unsuccessfull attempt"
    }
    constructor() {

    }
    async getCurrentUser() {
        try {
            const currentUser = await apiClient_getUser.get('/current-user', { withCredentials: true });
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
            const user = await axios.post('/api/v1/users/register', formDataobj, {
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
            const user = await axios.post('api/v1/users/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            console.log(user)
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
            const user = await apiClient_getUser.post('/logout', {}, { withCredentials: true })
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
            const user = await axios.post('users/refresh-token', {}, { withCredentials: true })
            console.log(user)
            return user
        } catch (error) {
            console.log("error at refresh token", error)
            this.err.message = error?.message
            return this.err
        }
    }

}
const UserSevice = new User()
export default UserSevice