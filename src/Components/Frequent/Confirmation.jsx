import React from 'react';

function Confirmation({ scale, setScale, setConfrimationResponse, yes, setYes }) {
    function hadleYes() {
        setConfrimationResponse(true)
        setYes("In progress")
    }
    function handleNo() {
        setScale(0)
        setYes("YES")
        setConfrimationResponse(false)
    }
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50' style={{ transform: `scale(${scale})` }}>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>Confirmation</h3>
                <p className='text-gray-700 dark:text-gray-300 mb-6'>Are you sure you want to proceed?</p>
                <div className='flex justify-around'>
                    <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded' onClick={hadleYes}>
                        {yes}
                    </button>
                    <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded' onClick={handleNo}>
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
