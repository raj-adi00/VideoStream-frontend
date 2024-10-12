import React, { useEffect, useState } from 'react'
import CommentService from '../Utility/Comment'
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import { useDispatch, useSelector } from 'react-redux'
import { GetComment } from '../../Store/CommentSlice'
function CommentBox({ videoid }) {
    // const [Comments, setComment] = useState([])
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const Comments = useSelector((state) => state.comments.comments)
    useEffect(() => {
        CommentService.getAllComments(videoid)
            .then((response) => {
                console.log(response)
                if (response.statusCode >= 400) {
                    setError(response.message)
                    dispatch(GetComment([]))
                }
                else {
                    dispatch(GetComment(response.data))
                    setError('')
                }
            })
            .catch((err) => {
                setError("Error fetching comments")
                dispatch(GetComment([]))
            }
            )
    }, [])
    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError('');
        }, 3000);

        return () => clearTimeout(timer);  // Clean up the timeout on re-renders or when error changes
    }, [error]);
    return (
        <div className='px-2 border-solid border-black rounded-lg'>
            <h3 className='font-bold text-gray-800 text-lg m-1'>Comments:</h3>
            <div className='w-full border-solid border-gray-600'></div>
            {error && (
                <div>
                    {error}
                </div>
            )}
            <div className='overflow-hidden'>
                <CommentForm setError={setError} />
            </div>
            <div className='w-full px-3 border-2 border-solid border-gray-700 rounded'>
                {Comments.length > 0 && (Comments.map((comment) =>
                    <CommentCard key={comment._id} comment={comment} setError={setError} />
                ))}
            </div>
        </div>
    )
}

export default CommentBox