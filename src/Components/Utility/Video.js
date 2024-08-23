import axios from 'axios';



export class Video {
    constructor() {

    }
    async fetchVideos() {
        try {
            const response = await axios.get('/api/v1/videos');
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
