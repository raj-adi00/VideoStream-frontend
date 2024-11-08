import React from 'react'
import { useDispatch } from 'react-redux'
import { changePage } from '../Store/HomePageSlice'
function Pagination({ page, searchAfter, totalPage, setPage }) {
    const dispatch = useDispatch()
    function changeHomePage(increment) {
        let newPage = page + increment
        if (newPage < 1 || newPage > totalPage)
            return
        dispatch(changePage({ increment, totalPage }))
        setPage(newPage)
    }
    return (
        <div className="w-screen px-5 py-4 bg-gray-100">
            <div className="flex items-center justify-between max-w-md mx-auto bg-white shadow-md rounded-lg p-3">
                <div>
                    {page > 1 && (
                        <button
                            onClick={() => changeHomePage(-1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                        >
                            Previous
                        </button>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        value={page}
                        readOnly
                        className="w-16 text-center border border-gray-300 rounded py-2 mx-4"
                    />
                    <span className="text-gray-600">of {totalPage}</span>
                </div>
                <div>
                    {page < totalPage && (
                        <button
                            onClick={() => changeHomePage(1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Pagination