import React from 'react'
import { useSelector } from 'react-redux'
function ChannelName() {
    const user = useSelector((state) => state.auth.userDetails)
    return (
        <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold text-gray-900">Channel: </span>
            {user?.data?.username || 'Unknown'}
        </div>
    )
}

export default ChannelName