import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ _id, video_public_id, thumbnail, title }) => {
    return (
        <div className="flex items-center bg-gray-800 text-white rounded-lg shadow-md p-3 w-80 hover:shadow-lg transition-shadow">
            <img src={thumbnail} alt={title} className="w-20 h-20 object-cover rounded-md" />
            <div className="ml-4 flex">
                <h3 className="text-sm font-semibold truncate">{title}</h3>

                {/* Link to video */}
                <Link
                    to={{
                        pathname: `/${_id}`,
                    }}
                    state={{ video_public_id }}
                    className="mt-1 inline-block text-blue-400 text-xs hover:underline"
                >
                    View Video
                </Link>
            </div>
        </div >
    );
};

export default VideoCard;
