import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoCard from './VideoCard'; // Assuming you have a VideoCard component to display other videos

function VideoPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { video_public_id } = state || {};
    const [otherVideos, setOtherVideo] = useState([]);

    useEffect(() => {
        const fetchVideos = () => {
            return new Promise((resolve, reject) => {
                try {
                    const storedVideos = localStorage.getItem('allvideo');
                    if (storedVideos) {
                        resolve(JSON.parse(storedVideos));
                    } else {
                        resolve([]); // Resolve with an empty array if no data is found
                    }
                } catch (error) {
                    reject(error); // Reject if there's a parsing error
                }
            });
        };

        fetchVideos()
            .then((res) => {
                setOtherVideo(res); // Update state with the result
            })
            .catch((err) => {
                console.error('Error fetching videos from localstorage:', err);
            });
    }, []);

    return (
        <div className="container mx-auto p-4">
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
                            frameBorder="0"
                            title="Video Player"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 hover:bg-gray-700">Update</button>
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 hover:bg-gray-700">Delete</button>
                    </div>
                </div>

                {/* Other Videos Section */}
                <div className="w-2/5 border border-black p-3 overflow-auto">
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


