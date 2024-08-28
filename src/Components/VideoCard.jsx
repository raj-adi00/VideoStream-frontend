import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const VideoCard = ({ _id, thumbnail, title, channel_owner,video_public_id }) => {
    // const iframeref=useRef(null)
  return (
    <div className=" flex p-2 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600">
      <Link to={`/${_id}`} state={{ video_public_id }}>
        <img 
          className="w-24 h-16 object-cover" 
          src={thumbnail} 
          alt={title} 
        />
      </Link>
      <div className="ml-3 text-xs">
        <h3 className="font-semibold mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">Channel: {channel_owner[0].username}</p>
      </div>
    </div>
  );
};

export default VideoCard;

