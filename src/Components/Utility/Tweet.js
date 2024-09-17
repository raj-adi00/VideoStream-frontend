import axios from "axios";
import { response_interceptor } from "../Interceptor/apiClient";


export class Tweets {

    async getAllTweets() {
        try {
            const alltweets = await axios.get('/api/v1/tweet/get-tweets')
            return alltweets
        } catch (error) {
            console.log("error at Gettin all the tweets", error)
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

    async CreateTweet(FormData) {
        try {
            const createTweetStatus = await response_interceptor.post('/tweet/create-tweet', FormData, { withCredentials: true })
            return createTweetStatus;
        } catch (error) {
            console.log("error at updating the tweets", error)
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

    async deleteTweet(tweetid) {
        try {
            const deletestatus = await response_interceptor.delete(`/tweet/${tweetid}`, { withCredentials: true })
            return deletestatus
        } catch (error) {
            console.log("error at deleting the tweets", error)
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

    async updateTweet(tweetid, updateobj) {
        try {
            const updateStatus = await response_interceptor.post(`/tweet/update-tweet/${tweetid}`, updateobj, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            return updateStatus
        } catch (error) {
            try {
                const deletestatus = await response_interceptor.delete(`/tweet/${tweetid}`, { withCredentials: true })
                return deletestatus
            } catch (error) {
                console.log("error at updating the tweets", error)
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
}
const TweetService = new Tweets()
export default TweetService