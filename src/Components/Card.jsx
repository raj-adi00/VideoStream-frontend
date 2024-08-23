import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ videoId, thumbnail, title, owner, channel_owner, createdAt, updatedAt, description, videoFile, duration, views, isPublished, video_public_id, thumbnail_public_id }) => {
    return (

        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 min-w-80 min-h-72">
            <Link to={`/video/${videoId}`}>
                <img className="w-full h-60 object-cover" src={thumbnail} alt={title} />
            </Link>
            <div className="px-3 py-4 overflow-hidden">
                <div className="font-semibold text-base text-left mb-2 truncate">
                    {title}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Channel: {channel_owner[0].username}
                </p>
            </div>
        </div>
    );
};

export default Card;
