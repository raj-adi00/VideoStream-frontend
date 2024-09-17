import React, { useEffect, useRef, useState } from 'react'
import Channel from '../Frequent/Channel'
import TweetService, { Tweets } from '../Utility/Tweet'

function TweetCard({ ...props }) {
    // console.log(props)
    const tweetid = props.data._id;
    const [isOwner, setIsowner] = useState(false)
    const [content, setContent] = useState(props?.data?.content || null)
    const [redaonly, setReadonly] = useState(true)
    const [channelData, setChannelData] = useState({})
    const [Edit, SetEdit] = useState("Edit")
    const inputTag = useRef()
    useEffect(() => {
        if (redaonly) {
            inputTag.current.setAttribute("readOnly", true)
            SetEdit("Edit")
        }
        else {
            inputTag.current.removeAttribute("readOnly")
            SetEdit("Save")
        }
        if (!redaonly) {
            inputTag.current.style.border = "1px solid black"
            inputTag.current.style.padding = "1px 0px"
        } else {
            inputTag.current.style.border = ""
            inputTag.current.style.padding = ""
        }
    }, [redaonly])
    useEffect(() => {
        const textarea = inputTag.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height to auto to calculate scrollHeight
            textarea.style.height = `${textarea.scrollHeight + 10}px`; // Adjust height based on content
        }
    }, [content]);
    useEffect(() => {
        if (props.curUser == props.data.onwer)
            setIsowner(true)
        else
            setIsowner(false)
        setChannelData({ username: props.data.owner_details.username, createdAt: props.data.createdAt })
    }, [])
    function handleChange(e) {
        setContent(e.target.value)
    }
    async function handleDelete() {
        try {
            const deleteTweet = await TweetService.deleteTweet(tweetid)
            if (deleteTweet.status != 200)
                props.setError(deleteTweet?.message || "Something went wrong")
            else {
                window.location.reload()
            }
        } catch (error) {
            console.log("Error while Deleting the tweet", error)
            props.setError(error?.message || "Something went wrong")
        }
    }
    async function handleEdit() {
        if (!redaonly) {
            try {
                const updateDetails = await TweetService.updateTweet(tweetid, { content })
                if (updateDetails.status != 200)
                    props.setError(updateDetails?.message || "Something went wrong")
                else
                    setReadonly(!redaonly)

            } catch (error) {
                console.log("Error while updating the tweet", err)
                props.setError(error?.message || "Something went wrong")
            }
        }
        else
            setReadonly(!redaonly)
    }
    return (
        <div className='flex w-full flex-col px-4 border-2 border-solid my-3 mx-2 rounded-lg'>
            <div className='flex justify-between'>
                {channelData && <Channel channelDetails={channelData} />}
                {isOwner && <div className='flex gap-2 flex-wrap py-1'>
                    <div className='flext items-center'>
                        <button
                            onClick={handleEdit}
                            className={`px-4 py-1 rounded-md text-white ${redaonly ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {Edit}
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleDelete}
                            className='px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600'
                        >
                            Delete
                        </button>
                    </div>
                </div>}
            </div>
            {/* <input
                type='text'
                ref={inputTag}
                value={content}
                onChange={handleChange}
                className='w-full px-3 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-0'
            />
             */}
            <textarea
                ref={inputTag}
                value={content}
                onChange={handleChange}
                className='w-full px-3 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-0'
                placeholder='Type here...'
                style={{ resize: 'none', overflow: 'hidden' }}
            />
        </div>
    )
}

export default TweetCard
