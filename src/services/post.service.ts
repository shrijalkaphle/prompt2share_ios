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

export const likePostbyId = ({ id }: ILikeProps) => {
    return new Promise<ILikePostResponse>(async (resolve, reject) => {
        const endPoint = `${ENDPOINT.LIKE_POST}/${id}`;
        const type = REQUEST_TYPE.POST;
        const options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem(AUTH_CONSTANTS.TOKENKEY)
            }
        }

        axios[type](api_url + endPoint, options)
            .then(async (response: any) => {
                // STORE AUTH TOKEN
                resolve(response.data as ILikePostResponse)
            })
            .catch((response: any) => {
                reject(response)
            })
    })
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