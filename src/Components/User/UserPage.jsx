import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserSevice from '../Utility/User'
import { useDispatch } from 'react-redux';
import { info } from '../../Store/ErrorMessageSlice';
import handleAxiosError from '../Frequent/HandleAxiosError';
import { Link } from 'react-router-dom';

function UserPage() {
    const path = window.location.pathname;
    const username = path.substring(path.lastIndexOf('/') + 1);
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const [channel, setChannel] = useState({})
    const [watchHistory, setwatchHistory] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (!username) {
            setError(true)
            return
        }
        setError(false)
        UserSevice.getUserChannel(username)
            .then((res) => {
                if (res.statusCode == 200) {
                    setChannel(res.data.channel)
                    if (res.data.watchHistory && res.data.watchHistory.length > 0)
                        setwatchHistory(res.data.watchHistory)
                } else {
                    console.log(res)
                    dispatch(info(handleAxiosError(res).message))
                    setError(true)
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch(info(handleAxiosError(err).message))
                setError(false)
            })
    }, [username])
    if (error)
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <span>
                    Something Went Wrong!! Please try Again
                </span>
            </div>
        )
    else if (!channel) {
        return (<div className='w-full h-full flex justify-center items-center'>
            <span>
                Loading............................
            </span>
        </div>)
    }
    const coverImageUrl = channel.coverImage || 'https://via.placeholder.com/1200x300';
    const avatarUrl = channel.avatar || 'https://via.placeholder.com/100';

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            {/* Cover Image */}
            <div
                className="w-full h-72 bg-contain bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${coverImageUrl})`,
                }}
            />

            {/* User Info Box */}
            <div className="w-full max-w-screen-md bg-white p-6 mt-4 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4"
                />
                <h2 className="text-xl font-bold">{channel.username}</h2>
                <p className="text-gray-600">{channel.fullname}</p>
                <p className="text-gray-500">{channel.email}</p>
            </div>

            {/* Watch History Section */}
            {watchHistory && watchHistory.length > 0 && (
                <div className="w-full max-w-screen-md mt-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Watch History</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {watchHistory.map((video) => (
                            <div
                                key={video._id}
                                className="bg-white p-4 rounded-lg shadow-md flex items-center"
                                onClick={() => navigate(`/${video._id}`, { state: { video_public_id: video.video_public_id } })}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-24 h-16 object-cover rounded-lg mr-4"
                                />
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-sm font-semibold text-gray-800 truncate">
                                        {video.title.split(' ').length > 3 ? video.title.split(' ').slice(0, 3).join(' ') + '...' : video.title}
                                    </h4>
                                    <p className="text-xs text-gray-600">{video.owner[0].username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserPage