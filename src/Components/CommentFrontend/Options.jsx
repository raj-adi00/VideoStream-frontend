import React, { useState } from 'react';
import CommentService from '../Utility/Comment';
import Confirmation from '../Frequent/Confirmation';
import CommentEditButton from './CommentEditButton';
import CommentDeleteButton from './CommentDeleteButton';


function Options({ scale, comment, setError }) {


    return (
        <div>
            <div className='w-auto border-2 border-solid border-gray-500 rounded' style={{ transform: `scale(${scale})` }}>
                <div className='flex flex-col justify-center  w-auto px-2 py-1 gap-1'>
                    <CommentEditButton commentID={comment._id} setError={setError} comment={comment.content} />
                    <CommentDeleteButton commentID={comment._id} setError={setError} />
                </div>
            </div>
        </div>
    );
}

export default Options;
