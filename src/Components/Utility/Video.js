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

    async getParticularvideobyId(videoid) {
        //   console.log(videoid)
        try {
            const details = await axios.get('/api/v1/videos/videoid')
            if (details) {
                console.log(details)
                return details
            }

        } catch (error) {
            console.log("error at fetching video details", error)
        }
    }

    async getVideobyVideo_public_id(video_public_id) {
        try {
            const videoDetails = await axios.get(`/api/v1/videos/publicid/${video_public_id}`)
            if (videoDetails.status < 300)
                return videoDetails
            else
                return ""
        } catch (error) {
            console.log("Error at getting video by public id", error)
        }

    }

    async deleteVideo(videoid) {
        try {
            const deleteStatus = await axios.delete(`/api/v1/videos/${videoid}`)
            if (deleteStatus.status >= 400)
                return deleteStatus
            else
                return deleteStatus
        } catch (err) {
            console.log("Error while deleting the video", err)
            return err
        }
    }
}
const videoService = new Video();
export default videoService
