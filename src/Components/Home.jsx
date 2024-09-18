
import React, { useState, useEffect } from 'react'
import Card from './Card'
import videoService from './Utility/Video';
import ErrorPage from './ErrorPage';
import Loader from './Loader';


function Home() {
  const [allVideo, setAllVideo] = useState([]);
  const [statusCode, setStatusCode] = useState(200)
  const [Message, setMessage] = useState('');
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const loadVideos = async () => {
      setMessage("");
      setloading(true)
      try {
        const videoData = await videoService.fetchVideos();
        setStatusCode(videoData.statusCode)
        setMessage(videoData.message)
        setAllVideo(videoData.data.videos);
        if (videoData){
           localStorage.setItem("allvideo", JSON.stringify(videoData.data.videos));
          // console.log(allVideo)
        }
        setloading(false)
        console.log(videoData.data.videos)
      } catch (error) {
        console.error('Error loading videos:', error);
        setStatusCode(videoData.statusCode || 500)
        setMessage(videoData.message || "Something went wrong")
        setloading(false)
      }
    };
    loadVideos();
  }, []);
  // if (loading)
  //   return <Loader />

  // else if (statusCode >= 400)
  //   return (
  //     <ErrorPage statusCode={statusCode} message={Message} />
  //   )
  // else
  return (
    <div className='flex flex-col gap-3'>
      {/* <div className='w-full mt-14'> Sorting algorithm</div> */}
      <div className='flex gap-11 flex-wrap px-3 mt-16'>
        {allVideo && allVideo.map(vid =>
          <Card
            key={vid._id}
            {...vid}
          />
        )}
      </div>
    </div>
  )
}

export default Home