import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VideoCard from "./VideoCard"; // Assuming you have a VideoCard component to display other videos
import UserSevice from "./Utility/User";
import videoService from "./Utility/Video";
import UpdateVideoForm from "./UpdateVideoForm";
import CommentBox from "./CommentFrontend/CommentBox";
import { useDispatch } from "react-redux";
import { setLoadingState } from "../Store/authSlice";
import { info } from "../Store/ErrorMessageSlice";
import handleAxiosError from "./Frequent/HandleAxiosError";

function VideoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { video_public_id } = state || {};
  const [updateVideo, setUpdateVideo] = useState(false);
  const [otherVideos, setOtherVideo] = useState([]);
  const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false);
  const [videoOwner, setVideoOwner] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(""); // Error state added
  const [currentVideo, setCurrentVideo] = useState({});
  const iframeRef = useRef(null);
  const [videoOwnerDetailse, setVideoOwnerDetails] = useState({});
  const [isPublished, setIspublished] = useState(false);
  const [views, setViews] = useState();
  useEffect(() => {
    dispatch(setLoadingState(true));
    let storedVideos = [];

    const fetchVideos = () => {
      return new Promise((resolve, reject) => {
        try {
          storedVideos = localStorage.getItem("allvideo");
          if (storedVideos) {
            resolve(JSON.parse(storedVideos));
          } else {
            resolve([]);
          }
        } catch (error) {
          reject(error);
        }
      });
    };

    fetchVideos()
      .then((res) => {
        setOtherVideo(res); // Update state with the result
      })
      .catch((err) => {
        console.error("Error fetching videos from localstorage:", err);
        // setError('Error fetching videos from local storage'); // Set error message
      });

    UserSevice.getCurrentUser()
      .then((res) => {
        setCurrentUser(res?.data?.data?._id);
      })
      .catch((err) => {
        console.error("Error at getting the current user", err);
      });

    videoService
      .getVideobyVideo_public_id(video_public_id)
      .then((res) => {
        setVideoOwner(res?.data?.data?.owner);
        console.log(res.data.data);
        setViews(res.data.data.views);
        if (currentUser === videoOwner && res.data.data.owner && currentUser) {
          setIsCurrentUserOwner(true);
        }
        setCurrentVideo(res.data.data);
        setIspublished(res.data.data.isPublished);
        setVideoOwnerDetails(res.data.data.video_owner[0]);
      })
      .catch((err) => {
        console.error("Error at getting current video owner", err);
        dispatch(info(handleAxiosError(err).message));
      });
    dispatch(setLoadingState(false));
  }, [video_public_id, videoOwner, currentUser]);

  const handleDelete = async () => {
    dispatch(setLoadingState(true));
    try {
      setError("");
      // Implement delete logic here
      const data = await videoService.deleteVideo(id);
      if (data.data.statusCode < 300) navigate("/");
      else dispatch(info(handleAxiosError(data?.data).message));
    } catch (error) {
      console.error("Error at Deleting the video", error);
      dispatch(info(handleAxiosError(error).message));
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  const handleChangeCheckBox = async () => {
    dispatch(setLoadingState(true));
    try {
      const res = await videoService.changeToggleStatus(id, !isPublished);
      if (res.statusCode < 300) setIspublished(!isPublished);
      else dispatch(info(handleAxiosError(res).message));
    } catch (error) {
      console.log("Error while updating the toggle status", error);
      dispatch(info(handleAxiosError(error).message));
    } finally {
      dispatch(setLoadingState(false));
    }
  };
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4">
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
        )}
        {updateVideo && (
          <div className="w-full fixed top-8 z-10">
            <div className="mx-auto">
              <UpdateVideoForm
                setUpdateVideo={setUpdateVideo}
                currentVideo={currentVideo}
                setError={setError}
                id={id}
              />
            </div>
          </div>
        )}
        <div className="flex space-x-8">
          {/* Video Section */}
          <div className="w-3/5 mt-14">
            <div className="video-container mb-4">
              <iframe
                ref={iframeRef}
                src={`https://player.cloudinary.com/embed/?cloud_name=${
                  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                }&public_id=${video_public_id}&autoplay=true`} // Added autoplay parameter
                width="640"
                height="360"
                style={{
                  height: "auto",
                  width: "100%",
                  aspectRatio: "640/360",
                }}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Video Player"
              />
            </div>

            {isCurrentUserOwner && (
              <div className="flex space-x-4 items-center">
                <button
                  className="px-2 py-1 bg-gray-800 text-white rounded-md border border-gray-600 hover:bg-gray-700"
                  onClick={() => setUpdateVideo(true)}
                >
                  Update
                </button>
                <button
                  className="px-2 py-1 bg-gray-800 text-white rounded-md border border-gray-600 hover:bg-gray-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  checked={isPublished}
                  onChange={handleChangeCheckBox}
                  className="mr-2"
                />
                <label
                  htmlFor="isPublished"
                  className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                >
                  Public
                </label>
              </div>
            )}
            {currentVideo && (
              <div className="w-full border-2 border-solid rounded-lg py-2 px-1 mt-4">
                <h2 className="font-bold text-lg">{currentVideo.title}</h2>
                <div className="w-1/2 border-2 border-gray-500 my-3"></div>
                {videoOwnerDetailse && (
                  <div className="flex justify-between px-1 items-center">
                    <div
                      className="border-2 w-auto inline-block px-2 py-1 rounded-sm text-lg font-semibold cursor-pointer"
                      onClick={() =>
                        navigate(`/u/${videoOwnerDetailse.username}`)
                      }
                    >
                      Channel : {videoOwnerDetailse.username}
                    </div>
                    {views && <div>Views: {views}</div>}
                    <div className=" w-auto inline-block px-2 py-1 text-sm">
                      Created On:{" "}
                      {videoOwnerDetailse?.createdAt
                        ? new Date(videoOwnerDetailse.createdAt)
                            .toISOString()
                            .split("T")[0]
                        : "Date not available"}
                    </div>
                  </div>
                )}
                <p className="text-sm my-3">{currentVideo.description}</p>
              </div>
            )}
          </div>

          {/* Other Videos Section */}
          <div
            className="w-2/5 border border-black p-3 overflow-auto mt-14"
            style={{ maxHeight: "80vh" }}
          >
            <h2 className="text-xl font-semibold mb-4 relative">
              Related Videos
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {otherVideos &&
                otherVideos.map((video) => (
                  <VideoCard key={video._id} {...video} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-3">
        <CommentBox videoid={id} />
      </div>
    </div>
  );
}

export default VideoPage;
