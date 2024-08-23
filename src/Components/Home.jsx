
import React, { useState, useEffect } from 'react'
import Card from './Card'
import videoService from './Utility/Video';
import ErrorPage from './ErrorPage';
import Loader from './Loader';


function Home() {
  const [allVideo, setAllVideo] = useState([
    {
        "_id": "66bd02dfee24f22c59f00278",
        "videoFile": "http://res.cloudinary.com/dhqa8qbff/video/upload/v1723663068/ogd4cnpa5tdb5kenk1ha.mkv",
        "thumbnail": "http://res.cloudinary.com/dhqa8qbff/image/upload/v1723663070/avqmrpkcog6gpqn0vwoe.jpg",
        "title": "coder is trying",
        "description": "fff",
        "duration": 37.533,
        "views": 0,
        "isPublished": false,
        "owner": "669e4487f815ca143453ec7e",
        "video_public_id": "ogd4cnpa5tdb5kenk1ha",
        "thumbnail_public_id": "avqmrpkcog6gpqn0vwoe",
        "createdAt": "2024-08-14T19:17:51.681Z",
        "updatedAt": "2024-08-21T00:10:41.126Z",
        "channel_owner": [
            {
                "fullname": "virat kohli",
                "email": "kohli@gmail.com",
                "avatar": "http://res.cloudinary.com/dhqa8qbff/image/upload/v1722779021/fwoclprfq6hkobpgtwww.png",
                "username": "raj-adi"
            }
        ]
    },
    {
        "_id": "66c3d711a574c610de168edb",
        "videoFile": "http://res.cloudinary.com/dhqa8qbff/video/upload/v1724110607/kr0cazd6zr3smncxisvp.mkv",
        "thumbnail": "http://res.cloudinary.com/dhqa8qbff/image/upload/v1724110609/z44erz3nhsykn4j1xlfy.jpg",
        "title": "Coder in the house",
        "description": "This is my first video.",
        "duration": 37.533,
        "views": 0,
        "isPublished": true,
        "owner": "669e4487f815ca143453ec7e",
        "video_public_id": "kr0cazd6zr3smncxisvp",
        "thumbnail_public_id": "z44erz3nhsykn4j1xlfy",
        "createdAt": "2024-08-19T23:36:49.999Z",
        "updatedAt": "2024-08-19T23:36:49.999Z",
        "channel_owner": [
            {
                "fullname": "virat kohli",
                "email": "kohli@gmail.com",
                "avatar": "http://res.cloudinary.com/dhqa8qbff/image/upload/v1722779021/fwoclprfq6hkobpgtwww.png",
                "username": "raj-adi"
            }
        ]
    }
]);
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
        setloading(false)
        console.log(videoData)
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
      <div className='w-full mt-14'> Sorting algorithm</div>
      <div className='flex gap-11 flex-wrap px-3'>
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