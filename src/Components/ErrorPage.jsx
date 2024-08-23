import React from 'react';

const ErrorPage = ({ statusCode, message }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h1 className="text-6xl font-bold text-red-500">{statusCode}</h1>
                <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">{message}</p>
            </div>
        </div>
    );
};

export default ErrorPage;
