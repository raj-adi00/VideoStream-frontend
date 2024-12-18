
import React, { useState, useEffect } from 'react'
import Card from './Card'
import videoService from './Utility/Video';
import ErrorPage from './ErrorPage';
import Loader from './Loader';
import Pagination from '../Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const [allVideo, setAllVideo] = useState([]);
  const [statusCode, setStatusCode] = useState(200)
  const [Message, setMessage] = useState('');
  const [loading, setloading] = useState(false)
  const reduxPage = useSelector(state => state.homePage.homePage);  // Get page from Redux store
  const [page, setPage] = useState(reduxPage);  // Initialize local state with reduxPage  
  const [searchAfter, setsearchAfter] = useState('')
  const [totalPage, settotalPage] = useState(0)
  useEffect(() => {
    const loadVideos = async () => {
      setMessage("");
      setloading(true)
      try {
        const videoData = await videoService.fetchVideos(page);
        setStatusCode(videoData.statusCode)
        setMessage(videoData.message)
        setAllVideo(videoData.data.videos);
        settotalPage(videoData.data.totalPage)
        setsearchAfter(videoData.data.searchAfter)
        if (videoData) {
          localStorage.setItem("allvideo", JSON.stringify(videoData.data.videos));
        }
        setloading(false)
      } catch (error) {
        console.error('Error loading videos:', error);
        setStatusCode(videoData.statusCode || 500)
        setMessage(videoData.message || "Something went wrong")
        setloading(false)
      }
    };
    loadVideos();
  }, [page]);
  // if (loading)
  //   return <Loader />

  // else if (statusCode >= 400)
  //   return (
  //     <ErrorPage statusCode={statusCode} message={Message} />
  //   )
  // else
  return (
    <div className='flex flex-col gap-3 max-w-screen overflow-hidden'>
      <div className='flex gap-11 flex-wrap px-3 mt-16'>
        {allVideo && allVideo.map(vid =>
          <Card
            key={vid._id}
            {...vid}
          />
        )}
      </div>
      <div>
        <Pagination page={page} searchAfter={searchAfter} totalPage={totalPage} setPage={setPage} />
      </div>
    </div>
  )
}

export default Home