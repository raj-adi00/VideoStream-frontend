import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { info } from '../../Store/ErrorMessageSlice'
function ChannelName() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.userDetails)
    const dispatch = useDispatch()
    const handlClick = () => {
        const username = user?.username
        if (username)
            navigate(`/u/${username}`)
        else {
            dispatch(info('Username not found'))
        }
    }
    return (
        <div className="text-lg font-semibold text-gray-800" onClick={handlClick}>
            <span className="font-bold text-gray-900">Channel: </span>
            {user?.username || 'Unknown'}
        </div>
    )
}

export default ChannelName