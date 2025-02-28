// const BACKEND_URL = "https://itube-iser.onrender.com"
// const BACKEND_URL='http://localhost:8000'
const BACKEND_URL = "https://videostream-production-3c23.up.railway.app";



import axios from 'axios';
import { apiClient2, apiClient_getUser, response_interceptor } from '../Interceptor/apiClient';
import handleAxiosError from '../Frequent/HandleAxiosError';



export class Video {
    async fetchVideos(searchAfter) {
        try {
            const response = await apiClient2.get('', {
                params: {
                    searchAfter: searchAfter
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching videos:', error);
            throw error;
        }
    }
    async uploadVideo(data) {
        try {
            // Proper logging for FormData:
            // for (let [key, value] of data.entries()) {
            //     console.log(`${key}:`, value);
            // }

            const response = await response_interceptor.post('/videos/upload-video', data, {
                // No need to set Content-Type header for FormData manually
                withCredentials: true
            });

            if (response) {
                return response;
            }
        } catch (error) {
            console.log("Error at Uploading the video", error);
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
        try {
            const details = await axios.get(`${BACKEND_URL}/api/v1/videos/videoid`, { withCredentials: true })
            if (details) {
                return details
            }

        } catch (error) {
            console.log("error at fetching video details", error)
        }
    }

    async getVideobyVideo_public_id(video_public_id) {
        try {
            const videoDetails = await axios.get(`${BACKEND_URL}/api/v1/videos/publicid/${video_public_id}`, { withCredentials: true })
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
            const deleteStatus = await response_interceptor.delete(`videos/${videoid}`, { withCredentials: true })
            if (deleteStatus.status >= 400)
                return deleteStatus
            else
                return deleteStatus
        } catch (err) {
            console.log("Error while deleting the video", err)
            return err
        }
    }

    async updateVideo(FormData, id) {
        try {
            // console.log(FormData)
            const updateStatus = await response_interceptor.patch(`/videos/${id}`, FormData, { withCredentials: true })
            if (updateStatus.data.statusCode < 300)
                return updateStatus.data
            else
                return updateStatus.data.data
        } catch (error) {
            console.log("Error at updating Video", error)
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

    async changeToggleStatus(videoid, PublishStatus) {
        try {
            const status = await response_interceptor.patch(`/videos/toggle/publish/${videoid}`, { isPublished: PublishStatus }, { withCredentials: true })
            if (status.data.statusCode < 300)
                return status.data
            else
                return status.data.data
        } catch (error) {
            console.log("error at updating publish status", error)
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
    async updateView(videoid) {
        try {
            const updateVideoViews = await (await axios.patch(`${BACKEND_URL}/api/v1/videos/update-view-count/${videoid}`, {}, { withCredentials: true }))?.data
            if (updateVideoViews.statusCode === 200)
                return updateVideoViews;
            else
                return handleAxiosError(updateVideoViews)
        } catch (error) {
            console.log(error)
            return handleAxiosError(error)
        }
    }

    async getMyVideo() {
        try {
            const myVideos = await axios.get(`${BACKEND_URL}/api/v1/videos/my/personalised-video`, { withCredentials: true })
            if (myVideos.status === 200)
                return myVideos.data
            return handleAxiosError(myVideos)
        } catch (error) {
            console.log(error)
            return handleAxiosError(error)
        }
    }
}
const videoService = new Video();
export default videoService
