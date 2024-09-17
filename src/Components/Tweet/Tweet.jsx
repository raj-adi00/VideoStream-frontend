import React, { useEffect, useState } from 'react';
import TweetService from '../Utility/Tweet';
import TweetCard from './TweetCard';
import UserService from '../Utility/User'; // Fixed typo from UserSevice to UserService

function Tweet() {
    const [error, setError] = useState("");
    const [allTweets, setAllTweets] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // Set initial state to null for clarity

    const getTweets = async () => {
        try {
            setError("");
            const response = await TweetService.getAllTweets();
            if (response.status === 200) {
                setAllTweets(response.data.data); // Use strict equality
            } else {
                setError(response?.message || "Something is wrong");
            }
        } catch (error) {
            console.error("Error fetching the tweets:", error);
            setError(error?.message || "Please try again later. We will be back soon");
        }
    };

    const getCurrentUser = async () => {
        try {
            const response = await UserService.getCurrentUser(); // Fixed typo
            if (response.status === 200) {
                setCurrentUser(response.data.data._id);
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error("Error fetching the current user:", error);
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        getTweets();
        getCurrentUser();
    }, []);

    return (
        <div className='flex w-screen px-2 my-2 flex-col items-center'>
            {error && <p className="text-red-500 relative">{error}</p>}
            {allTweets.length > 0 && currentUser ? (
                allTweets.map((tweet, ind) => (     
                   tweet && <TweetCard key={tweet._id} currentUser={currentUser} data={tweet} setError={setError} index={ind} allTweets={allTweets} setAllTweets={setAllTweets} />
                ))
            ) : (
                <p>No tweets available or user data is missing.</p>
            )}
        </div>
    );
}

export default Tweet;
