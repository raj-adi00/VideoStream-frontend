import React, { useState, useEffect } from 'react';
import videoService from './Utility/Video';
import { Navigate, useNavigate } from 'react-router-dom';
const UploadVideoForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video: null,
        thumbnail: null,
        isPublished: true,
    });
    const [isDisable, setIsDisable] = useState(false)
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleToggle = (e) => {
        setIsDisable(true)
        const isChecked = e.target.checked;
        console.log('Checkbox state:', isChecked); // This will log the correct new state
        setFormData(prevData => ({
            ...prevData,
            isPublished: isChecked,
        }));
    };

    // Optional: Use useEffect to log the state after it has updated
    useEffect(() => {
        console.log('Updated isPublished:', formData.isPublished);
        setIsDisable(false)
    }, [formData.isPublished]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append("title", formData.title);
        formDataObj.append("description", formData.description);
        formDataObj.append("video", formData.video);
        formDataObj.append("thumbnail", formData.thumbnail);
        formDataObj.append("isPublished", formData.isPublished)

        try {
            setError("");

            const uploadStatus = await videoService.uploadVideo(formDataObj);
            if (!uploadStatus) {
                throw new Error("No response from server");
            }

            if (uploadStatus?.status >= 400) {
                setError(uploadStatus.message || "Error during upload");
            } else {
                setMessage(uploadStatus.message || "Video uploaded successfully");
                navigate("/"); // Navigate only after success
            }
        } catch (err) {
            console.error("Error while uploading the video", err);
            setError(err || "Something went wrong");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-white text-center">Upload Video</h2>
                {error && (
                    <div className="bg-red-500 text-white p-2 rounded mt-4 text-center">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="bg-green-500 text-white p-2 rounded mt-4 text-center">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div>
                        <label className="block text-sm text-white font-medium" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter video title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white font-medium" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter video description"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white font-medium" htmlFor="video">
                            Video File
                        </label>
                        <input
                            type="file"
                            name="video"
                            id="video"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white font-medium" htmlFor="thumbnail">
                            Thumbnail Image
                        </label>
                        <input
                            type="file"
                            name="thumbnail"
                            id="thumbnail"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className='flex gap-2 items-center text-white'>
                        <input
                            type="checkbox"
                            name="isPublished"
                            id="isPublished"
                            checked={formData.isPublished}
                            onChange={handleToggle}
                            className="mr-2"
                        />
                        <label
                            htmlFor="isPublished"
                            className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                        >Public</label>
                    </div>

                    <button
                        disabled={isDisable}
                        type="submit"
                        className={`w-full py-2 px-4 font-bold rounded-md transition-colors duration-200 ${isDisable ? 'bg-gray-500 cursor-not-allowed text-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        onClick={handleSubmit}
                    >
                        Upload Video
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadVideoForm;
