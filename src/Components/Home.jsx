import React, { useState, useEffect } from "react";
import Card from "./Card";
import videoService from "./Utility/Video";
import ErrorPage from "./ErrorPage";
import Loader from "./Loader";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoadingState } from "../Store/authSlice";
import { info } from "../Store/ErrorMessageSlice";
import handleAxiosError from "./Frequent/HandleAxiosError";
function Home() {
  const [allVideo, setAllVideo] = useState([]);
  const reduxPage = useSelector((state) => state.homePage.homePage); // Get page from Redux store
  const [page, setPage] = useState(reduxPage); // Initialize local state with reduxPage
  const [searchAfter, setsearchAfter] = useState("");
  const [totalPage, settotalPage] = useState(0);
  const IsBackendReady = useSelector((state) => state.auth.isBackendReady);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadVideos = async () => {
      if (!IsBackendReady) return;
      dispatch(setLoadingState(true));
      try {
        const videoData = await videoService.fetchVideos(page);
        if (videoData.statusCode < 400) {
          setAllVideo(videoData.data.videos);
          settotalPage(videoData.data.totalPage);
          setsearchAfter(videoData.data.searchAfter);
          if (videoData) {
            localStorage.setItem(
              "allvideo",
              JSON.stringify(videoData.data.videos)
            );
          }
        } else {
          dispatch(info("Failed to fetch Videos"));
        }
      } catch (error) {
        console.error("Error loading videos:", error);
        dispatch(info(handleAxiosError(error).message));
      } finally {
        dispatch(setLoadingState(false));
      }
    };
    loadVideos();
  }, [page,IsBackendReady]);
  return (
    <div className="flex flex-col gap-3 max-w-screen overflow-hidden">
      <div className="flex gap-11 flex-wrap px-3 mt-16">
        {allVideo && allVideo.map((vid) => <Card key={vid._id} {...vid} />)}
      </div>
      <div>
        <Pagination
          page={page}
          searchAfter={searchAfter}
          totalPage={totalPage}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default Home;
