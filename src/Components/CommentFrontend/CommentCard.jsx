import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Options from './Options';
function CommentCard({ comment }) {
  console.log(comment)
  const [commentContent, setCommentContent] = useState(comment.content);
  const [channel, setChannel] = useState(comment.owner[0].username);
  const [avatar, setAvatar] = useState(comment.owner[0].avatar);
  const [editable, setEditable] = useState(comment.editable || false)
  const [scale, setScale] = useState(0)
  function handleOptions() {
    const val = scale
    setScale(1 - val)
  }
  return (
    <div className="bg-white p-2 mb-2 rounded-lg shadow-lg w-full mx-auto">
      <div className='flex justify-between p-3 items-center'>
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={channel}
            className="w-8 h-8 rounded-full"
          />
          <h6 className="text-md font-semibold text-gray-900">{channel}</h6>
        </div>
        {editable && (
          <div onClick={handleOptions}>
            <FontAwesomeIcon icon={faBars} className="text-md text-gray-800" />
            <Options scale={scale} />
          </div>
        )}
      </div>
      <p className="text-black text-sm mb-3">
        {commentContent}
      </p>
      <div className="border-t border-gray-300 dark:border-gray-600"></div>
    </div>
  );
}

export default CommentCard;
