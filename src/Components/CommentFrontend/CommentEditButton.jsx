import React, { useDebugValue, useState } from 'react'
import Confirmation from '../Frequent/Confirmation'
import CommentEditForm from './CommentEditForm'
import CommentService from '../Utility/Comment'
import { useDispatch } from 'react-redux'
import { EditComment } from '../../Store/CommentSlice'

function CommentEditButton({ comment, commentID, setError }) {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch()
    function handleEdit() {
        setIsEditing(true)
    }
    const handleCancel = () => {
        setIsEditing(false);
    };
    const handleSave = (editedComment) => {
        // Logic to save the edited comment
        if (!editedComment) {
            setError("Comment can't be Empty")
            return
        }
        CommentService.UpdateComment(commentID, { comment: editedComment })
            .then((res) => {
                if (res.statusCode >= 400)
                    setError(res.message)
                else {
                    dispatch(EditComment({ id: commentID, editedComment: editedComment }))
                    setError(res.message)
                }
                setIsEditing(false);
            })
            .catch((err) => {
                console.log(err, "Errror at updating comment")
                setError("Error at Updating Comment")
                setIsEditing(false);
            })
    };
    return (
        <div>
            {isEditing && (
                <CommentEditForm
                    initialComment={comment}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            {/* <Confirmation scale={scale} setScale={setScale} setConfrimationResponse={setConfrimationResponse} yes={yes} setYes={setYes} /> */}
            <p className='border-b-2 cursor-pointer hover:text-blue-500' onClick={handleEdit}>Edit</p>
        </div>
    )
}

export default CommentEditButton