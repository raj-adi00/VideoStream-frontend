// TweetCreateForm.jsx
import React, { useState } from 'react';
import ChannelName from '../Frequent/ChannelName';
import TweetService from '../Utility/Tweet';


function TweetCreateForm(prps) {
    // console.log(prps)
    const [content, setContent] = useState('');

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', content);

        try {
            prps.setError('')
            const createdTweet = await TweetService.CreateTweet(formData)
            if (createdTweet.status == 200) {
                createdTweet.data.data.owner_details = createdTweet.data.data.owner
                createdTweet.data.data.owner = createdTweet.data.data.owner_details._id
                // console.log(createdTweet)
                const temp = prps.allTweets
                temp.push(createdTweet.data.data)
                prps.setAllTweets(temp)
                prps.changeVisible(!prps.currentstate)
            }
            else
                prps.setError(createdTweet?.message || "Something went wrong")
        } catch (error) {
            console.log("Error while creating the tweet")
            prps.setError(error?.message || "Something went wrong")
        }
    };

    return (
        <div className={`fixed bottom-0 left-0 w-full max-w-2xl mx-auto transition-transform duration-300 border-2 border-black ${prps.currentstate ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="bg-white shadow-md rounded-lg p-4 relative">
                <button
                    onClick={() => prps.changeVisible(!prps.currentstate)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="#707277" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                {/* <Channel /> Include the Channel component */}
                <ChannelName />
                <h2 className="text-xl font-semibold mb-4">Create a Tweet</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={content}
                        onChange={handleChange}
                        placeholder="What's happening?"
                        rows="4"
                        className="w-full p-2 border rounded-lg resize-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Tweet
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TweetCreateForm;
