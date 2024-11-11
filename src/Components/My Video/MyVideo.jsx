import React, { useEffect, useState } from 'react'
import videoService from '../Utility/Video'
import { useDispatch } from 'react-redux'
import info from '../../Store/ErrorMessageSlice'
import handleAxiosError from '../Frequent/HandleAxiosError'
import VideoCard from './VideoCard'

function MyVideo() {
  const [myVideos, setMyVideos] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    videoService.getMyVideo()
      .then((res) => {
        console.log(res.data)
        setMyVideos(res.data)
      })
      .catch((err) => {
        console.log(err)
        dispatch(info(handleAxiosError(err).message))
      })
  }, [])
  return (
    <div className="min-h-screen bg-gray-100">
      <div className='flex flex-col gap-3 max-w-screen overflow-hidden'>
        <div className='flex gap-11 flex-wrap px-3 mt-16'>
          {myVideos && myVideos.length > 0 ? (
            myVideos.map((card) => (
              <VideoCard
                key={card._id}
                _id={card._id}
                video_public_id={card.video_public_id}
                thumbnail={card.thumbnail}
                title={card.title}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">No videos found.</p>
          )}
        </div>
      </div>
    </div>
  );


}

export default MyVideo