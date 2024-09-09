import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VideoCard from './VideoCard'; // Assuming you have a VideoCard component to display other videos
import UserSevice from './Utility/User';
import videoService from './Utility/Video';

function VideoPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const { video_public_id } = state || {};

    const [otherVideos, setOtherVideo] = useState([]);
    const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false);
    const [videoOwner, setVideoOwner] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(''); // Error state added

    useEffect(() => {
        let storedVideos = [];

        const fetchVideos = () => {
            return new Promise((resolve, reject) => {
                try {
                    storedVideos = localStorage.getItem('allvideo');
                    if (storedVideos) {
                        resolve(JSON.parse(storedVideos));
                    } else {
                        resolve([]);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        };

        fetchVideos()
            .then((res) => {
                setOtherVideo(res); // Update state with the result
            })
            .catch((err) => {
                console.error('Error fetching videos from localstorage:', err);
                setError('Error fetching videos from local storage'); // Set error message
            });

        UserSevice.getCurrentUser()
            .then((res) => {
                setCurrentUser(res?.data?.data?._id);
            })
            .catch((err) => {
                console.error("Error at getting the current user", err);
                setError('Error fetching the current user'); // Set error message
            });

        videoService.getVideobyVideo_public_id(video_public_id)
            .then((res) => {
                setVideoOwner(res?.data?.data?.owner);
                if (currentUser === videoOwner) {
                    setIsCurrentUserOwner(true);
                }
            })
            .catch((err) => {
                console.error("Error at getting current video owner", err);
                setError('Error fetching the current video owner'); // Set error message
            });
    }, [currentUser, videoOwner, video_public_id]);

    const handleDelete = async () => {
        try {
            setError('')
            // Implement delete logic here
            const data = await videoService.deleteVideo(id)
            console.log(data.data)
            if (data.data.statusCode < 300)
                navigate('/')
            else
                setError(data.data.message)
        } catch (error) {
            console.error("Error at Deleting the video", error);
            if (error.response) {
                console.error("Backend returned an error:", error.response.data.message);
                setError(error.response.data.message); // Set error message from backend
            } else if (error.request) {
                console.error("No response received from the backend", error.request);
                setError("No response from the server. Please try again later.");
            } else {
                console.error("Error setting up the request", error.message);
                setError("Request setup error: " + error.message);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            {error && (
                <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                </div>
            )}
            <div className="flex space-x-8">
                {/* Video Section */}
                <div className="w-3/5">
                    <div className="video-container mb-4">
                        <iframe
                            src={`https://player.cloudinary.com/embed/?cloud_name=dhqa8qbff&public_id=${video_public_id}&autoplay=true`} // Added autoplay parameter
                            width="640"
                            height="360"
                            style={{ height: 'auto', width: '100%', aspectRatio: '640/360' }}
                            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                            allowFullScreen
                            title="Video Player"
                        />
                    </div>

                    {isCurrentUserOwner && (
                        <div className="flex space-x-4">
                            <button className="px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-600 hover:bg-gray-700">Update</button>
                            <button className="px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-600 hover:bg-gray-700" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Other Videos Section */}
                <div className="w-2/5 border border-black p-3 overflow-auto" style={{ maxHeight: "80vh" }}>
                    <h2 className="text-xl font-semibold mb-4 relative">Related Videos</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {otherVideos && otherVideos.map((video) => (
                            <VideoCard key={video._id} {...video} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;



