import axios from "axios";
import { ENDPOINT } from "../enum/endpoint.enum";
import { IBlockUserProps, ICommentProps, ICreateManualImagePostProps, ICreateManualTextPostProps, ICreateManualVideoPostProps, ICreatePostProps, IDeletePostProps, IGetPostParams, ILikePostResponse, ILikeProps, IPostResponse, IReportPostProps, IUpdateFollowStatusProps } from "../types/services/post.type";

const api_url = process.env.EXPO_PUBLIC_API_URL;

export const getPost = async ({ perPage, page }: IGetPostParams) => {
    const endPoint = `${ENDPOINT.POST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(`${api_url}/${endPoint}`)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getUserPost = async ({ perPage, page }: IGetPostParams) => {
    const endpoint = `${api_url}/${ENDPOINT.MINE_POST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const likePostbyId = async ({ id }: ILikeProps) => {
    const endPoint = `${api_url}/${ENDPOINT.LIKE_POST}/${id}`;
    try {
        const result = await axios.post(endPoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const tyophyPostbyId = async ({ id }: ILikeProps) => {
    const endPoint = `${api_url}/${ENDPOINT.TROPHY_POST}/${id}`;
    try {
        const result = await axios.post(endPoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}


export const commentPostbyId = async (commentProps: ICommentProps) => {
    const endpoint = `${api_url}/${ENDPOINT.COMMENT_POST}`;
    try {
        const result = await axios.post(endpoint,commentProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const createPost = async (createPostProps: ICreatePostProps) => {
    const endpoint = `${api_url}/${ENDPOINT.POST_GENERATE}`;
    try {
        const result = await axios.post(endpoint,createPostProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const createManualTextPost = async (createManualTextPostProps: ICreateManualTextPostProps) => {
    const endpoint = `${api_url}/${ENDPOINT.MAUNAL_TEXT_POST}`;
    try {
        const result = await axios.post(endpoint,createManualTextPostProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}


export const createManualImagePost = async (createManualImagePostProps: ICreateManualImagePostProps) => {
    const endpoint = `${api_url}/${ENDPOINT.MAUNAL_IMAGE_POST}`;
    try {
        const result = await axios.post(endpoint,createManualImagePostProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const createManualVideoPost = async (createManualVideoPostProps: ICreateManualVideoPostProps) => {
    const endpoint = `${api_url}/${ENDPOINT.MAUNAL_VIDEO_POST}`;
    try {
        const result = await axios.post(endpoint,createManualVideoPostProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getPostbyUserId = async ({page, perPage, user_id}: IGetPostParams ) => {
    const endpoint = `${api_url}/${ENDPOINT.POST}?user_id=${user_id}&${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const updateFollowStatus = async (updateFollowStatusProps: IUpdateFollowStatusProps) => {
    const endpoint = `${api_url}/${ENDPOINT.UPDATE_FOLLOWING}`;
    try {
        const result = await axios.post(endpoint,updateFollowStatusProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const deletePostById = async (id: number) => {
    const endpoint = `${api_url}/${ENDPOINT.POST}?postId=${id}`;
    try {
        const result = await axios.delete(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const reportPostForProblem = async (reportPostProps: IReportPostProps) => {
    const endpoint = `${api_url}/${ENDPOINT.REPORT_POST}`;
    try {
        const result = await axios.post(endpoint,reportPostProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}