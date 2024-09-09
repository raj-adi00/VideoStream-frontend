import axios from 'axios';
import { apiClient2, apiClient_getUser, response_interceptor } from '../Interceptor/apiClient';



export class Video {
    constructor() {

    }
    async fetchVideos() {
        try {
            const response = await apiClient2.get('');
            console.log('Videos fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching videos:', error);
            throw error;
        }
    }
    async uploadVideo(data) {
        try {
            // Proper logging for FormData:
            for (let [key, value] of data.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await response_interceptor.post('/videos/upload-video', data, {
                // No need to set Content-Type header for FormData manually
                withCredentials: true
            });

            if (response) {
                return response;
            }
        } catch (error) {
            console.log("Error at Uploading the video");
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

}
const videoService = new Video();
export default videoService
