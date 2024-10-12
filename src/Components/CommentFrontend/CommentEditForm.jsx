import React, { useState } from 'react';

const CommentEditForm = ({ initialComment, onSave, onCancel }) => {
    const [comment, setComment] = useState(initialComment);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(comment); // Call the onSave function with the edited comment
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-3">
            <textarea
                value={comment}
                onChange={handleChange}
                className="p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200 w-full"
                placeholder="Edit your comment..."
            />
            <div className="flex justify-between mt-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default CommentEditForm;
