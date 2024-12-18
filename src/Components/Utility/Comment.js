// const BACKEND_URL="https://itube-iser.onrender.com"
const BACKEND_URL='http://localhost:8000'



import axios from "axios";
import handleAxiosError from "../Frequent/HandleAxiosError";
import { response_interceptor } from "../Interceptor/apiClient";

export class Comments {
    async getAllComments(videoid) {
        try {
            const allComments = await axios.get(`${BACKEND_URL}/api/v1/comments/get-comment/${videoid}`,{withCredentials:true})
            // console.log(allComments.data.data)
            return allComments.data
        } catch (error) {
            console.log("Error while Fetching all comments", error)
            return handleAxiosError(error)
        }
    }
    async CreateComment(videoid, formData) {
        try {
            console.log(videoid)
            const CreatedComment = await response_interceptor.post(`/comments/create-comment/${videoid}`, formData, { headers: { 'Content-Type': 'application/json' },withCredentials:true })
            // console.log(CreatedComment.data.data)
            return CreatedComment.data
        } catch (error) {
            console.log("Error while Creating Comment", error)
            return handleAxiosError(error)
        }
    }

    async UpdateComment(commentid, formData) {
        try {
            const UpdatedComment = await response_interceptor.patch(`/comments/update-comment/${commentid}`, formData, { headers: { 'Content-Type': 'application/json' },withCredentials:true })
            // console.log(UpdatedComment.data.data)
            return UpdatedComment.data
        } catch (error) {
            console.log("Error while updating the comment", error)
            return handleAxiosError(error)
        }
    }

    async DeleteComment(commentid) {
        try {
            console.log(commentid)
            const DeletedComment = await response_interceptor.delete(`/comments/delete-comment/${commentid}`,{withCredentials:true})
            // console.log(DeletedComment.data.data)
            return DeletedComment.data
        } catch (error) {
            console.log("Error at deleting the comment", error)
            return handleAxiosError(error)
        }
    }
}

const CommentService = new Comments()
export default CommentService