import axios from 'axios';
import { apiClient2 } from '../Interceptor/apiClient';



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

}
const videoService = new Video();
export default videoService
