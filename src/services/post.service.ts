import axios, { AxiosRequestConfig } from "axios";
import { ENDPOINT } from "../enum/endpoint.enum";
import { REQUEST_TYPE } from "../enum/http.enum";
import { ICommentProps, ICreateManualPostProps, ICreatePostProps, IGetPostParams, ILikePostResponse, ILikeProps, IPostResponse } from "../types/services/post.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_CONSTANTS } from "../enum/auth.enum";

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

export const createManualPost = async (createManualPostProps: ICreateManualPostProps) => {
    const endpoint = `${api_url}/${ENDPOINT.POST}`;
    try {
        const result = await axios.post(endpoint,createManualPostProps)
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