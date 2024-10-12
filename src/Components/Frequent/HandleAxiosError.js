function handleAxiosError(error) {
    if (error.response) {
        // Server responded with a status outside of the 2xx range
        return {
            message: error.response.data?.message || "An error occurred on the server",
            status: error.response.status,
            statusCode: error.response.status ||404
        };
    } else if (error.request) {
        // Request was made but no response was received
        return {
            message: "No response from server",
            status: 503,
            statusCode: 503
        };
    } else {
        // Something else went wrong
        return {
            message: "An unexpected error occurred",
            status: 500,
            statusCode: 500
        };
    }
}
export default handleAxiosError
