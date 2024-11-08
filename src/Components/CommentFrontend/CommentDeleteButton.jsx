import React, { useEffect, useState } from 'react'
import CommentService from '../Utility/Comment'
import { useDispatch } from 'react-redux'
import Confirmation from '../Frequent/Confirmation'
import { DeleteComment } from '../../Store/CommentSlice'


function CommentDeleteButton({ commentID, setError }) {
    const [scale, setScale] = useState(0)
    const [yes, setYes] = useState("YES")
    const [confirmationResponse, setConfrimationResponse] = useState(false)
    const dispatch = useDispatch()
    function handleDelete() {
        // console.log(1)
        setScale(1)
    }
    useEffect(() => {
        if (!confirmationResponse)
            return
        console.log(confirmationResponse)
        CommentService.DeleteComment(commentID)
            .then((res) => {
                if (res.statusCode >= 400) {
                    setError(res?.message || "Something went wrong")
                } else {
                    dispatch(DeleteComment(commentID))
                    setError("Comment Successfully Deleted")
                }
                setScale(0)
                setYes("YES")
            })
            .catch((err) => {
                setError("Something went wrong")
                console.log(err, "Error at Delete Comment")
                setScale(0)
                setYes("YES")
            })
        setConfrimationResponse(false)
    }, [confirmationResponse])
    return (
        <div className='overflow-hidden relative'>
            <p className='cursor-pointer hover:text-red-500' onClick={handleDelete}>Delete</p>
            <div className='fixed top-0 right-0'>
                <Confirmation scale={scale} setScale={setScale} setConfrimationResponse={setConfrimationResponse} yes={yes} setYes={setYes} />
            </div>
        </div>
    )
}

export default CommentDeleteButton