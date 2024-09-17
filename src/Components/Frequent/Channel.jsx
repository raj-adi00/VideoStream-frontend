import React from 'react'

function Channel({ ...props }) {
    const { username, createdAt } = props.channelDetails || {};

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center my-3 p-3 border border-gray-300 rounded-md shadow-sm bg-white w-full max-w-lg">
            <div className="text-lg font-semibold text-gray-800">
                <span className="font-bold text-gray-900">Channel: </span>
                {username || 'Unknown'}
            </div>

            <div className="text-sm text-gray-500 mt-2 sm:mt-0 sm:text-right">
                <span className="font-semibold">Created On: </span>
                {createdAt
                    ? new Date(createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Date not available'}
            </div>
        </div>
    );
}

export default Channel;
