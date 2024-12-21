import React, { useState } from "react";
import videoService from "./Utility/Video";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoadingState } from "../Store/authSlice";

function UpdateVideoForm({ setUpdateVideo, currentVideo, setError, id }) {
  const [formData, setFormData] = useState({
    title: currentVideo.title,
    description: currentVideo.description,
  });
  const dispatch = useDispatch();
  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    dispatch(setLoadingState(true));
    const formDataobj = new FormData();
    formDataobj.append("title", formData.title);
    formDataobj.append("description", formData.description);

    const obj = {};
    for (const pair of formDataobj.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
      obj[pair[0]] = pair[1];
    }

    try {
      const update = await videoService.updateVideo(obj, id);
      console.log(update);
      if (update.statusCode < 300) {
        window.location.reload();
      } else {
        setError(update?.message || "Couldn't update the video");
      }
    } catch (error) {
      console.error("Error at form updation:", error);
      setError(error?.message || "Something went wrong");
    } finally {
      setLoadingState(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-gray-100 rounded-md shadow-md relative">
      <div className="flex justify-between h-auto mb-4">
        <h2 className="text-2xl font-semibold text-center">
          Update Video Details
        </h2>
        <div
          className=" border-black border-solid border-2 bg-red-600 text-black px-2"
          onClick={() => setUpdateVideo(false)}
        >
          X
        </div>
      </div>

      <form onSubmit={handleUpdateVideo}>
        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Video Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter video title"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Video Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter video description"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Update Video
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateVideoForm;
