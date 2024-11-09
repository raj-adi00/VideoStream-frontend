import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import videoService from './Utility/Video';
import { useDispatch } from 'react-redux';
import { info } from '../Store/ErrorMessageSlice';
import handleAxiosError from './Frequent/HandleAxiosError';

const Card = ({ _id, thumbnail, title, owner, channel_owner, video_public_id, toastMessage }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const updateViews = () => {
        videoService.updateView(_id)
            .then((res) => {
                if (res.statusCode === 200) {
                    navigate(`/${_id}`, { state: { video_public_id } })
                }
                else {
                    dispatch(info(res?.message))
                }
            })
            .catch((error) => {
                console.log(error)
                dispatch(info(handleAxiosError(error)))
            })
    }
    return (
        <div className="w-80 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 min-w-80 min-h-72 transition duration-300 ease-in-out hover:shadow-xl">
            <Link state={{ video_public_id }} onClick={updateViews}>
                <img className="w-full h-60 object-cover" src={thumbnail} alt={title} />
            </Link>
            <div className="px-3 py-4 overflow-hidden">
                <div className="font-semibold text-base text-left mb-2 truncate text-gray-900 dark:text-gray-100">
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