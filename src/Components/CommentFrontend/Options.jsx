import React from 'react';

function Options({ scale }) {
    return (
        <div className='w-auto border-2 border-solid border-gray-500 rounded' style={{ transform: `scale(${scale})` }}>
            <div className='flex flex-col justify-center  w-auto px-2 py-1 gap-1'>
                <p className='border-b-2 cursor-pointer hover:text-blue-500'>Edit</p>
                <p className='cursor-pointer hover:text-red-500'>Delete</p>
            </div>
        </div>
    );
}

export default Options;
