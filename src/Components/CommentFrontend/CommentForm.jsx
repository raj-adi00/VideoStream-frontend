import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faL } from '@fortawesome/free-solid-svg-icons';
import Confirmation from '../Frequent/Confirmation';
import CommentService from '../Utility/Comment';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GetComment, NewComment } from '../../Store/CommentSlice';

function CommentForm({ setError }) {
    const [content, setContent] = useState('')
    const [scale, setScale] = useState(0)
    const [confirmationResponse, setConfrimationResponse] = useState(false)
    const [yes, setYes] = useState("YES")
    const { id } = useParams()
    const dispatch = useDispatch()
    function handleChange(e) {
        setContent(e.target.value)
    }
    function handleClick(e) {
        e.preventDefault()
        if (!content) {
            setError("Content can't be empty")
            return
        }
        setScale(1 - scale)
    }
    useEffect(() => {
        console.log(confirmationResponse)
        if (!confirmationResponse)
            return
        const formData = new FormData();
        formData.append('comment', content);
        CommentService.CreateComment(id, formData)
            .then((res) => {
                setScale(0)
                setYes("YES")
                console.log(res.statusCode >= 400)
                if (res.statusCode >= 400)
                    setError(res.message)
                else {
                    dispatch(NewComment(res.data))
                    setContent('')
                }
                setConfrimationResponse(false)
            })
            .catch((error) => {
                setScale(0)
                setYes("YES")
                setError("Something went wrong!! Please Try again")
                console.log(error)
                setConfrimationResponse(false)
            }
            )
    }, [confirmationResponse, setConfrimationResponse])
    return (
        <div className="mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-3 overflow-hidden">
            <form className="flex gap-2 justify-between items-center">
                <textarea
                    id="content"
                    className=" p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200 w-4/5"
                    placeholder="Write your comment..."
                    value={content}
                    onChange={handleChange}
                ></textarea>
                <button
                    type="submit"
                    className="self-end flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    onClick={handleClick}
                >
                    <span>Post Comment</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </button>
            </form>
            <Confirmation scale={scale} setScale={setScale} setConfrimationResponse={setConfrimationResponse} yes={yes} setYes={setYes} />
        </div>
    );
}

export default CommentForm;

