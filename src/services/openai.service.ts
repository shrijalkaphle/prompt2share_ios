import axios from "axios";
import { ENDPOINT } from "../enum/endpoint.enum";
import { IEditImageProps, IGenerateFeedPostProps, IGenerateImageProps, IPostGenerateImageProps } from "../types/services/openai.type";


const api_url = process.env.EXPO_PUBLIC_API_URL;
export const generateFeedPost = async (generateFeedPropsProps: IGenerateFeedPostProps) => {
    console.log('generating text')
    const endpoint = `${api_url}/${ENDPOINT.FEED_GENERATE}`;
    try {
        const result = await axios.post(endpoint,generateFeedPropsProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
    
}

export const generateImages = async (generateImageProps: IGenerateImageProps) => {
    console.log('generating image')
    const endpoint = `${api_url}/${ENDPOINT.IMAGE_GENERATE}`;
    try {
        const result = await axios.post(endpoint,generateImageProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
    
}


export const postGenerateImage = async (postGenerateImageProps: IPostGenerateImageProps) => {
    const endpoint = `${api_url}/${ENDPOINT.IMAGE_POST}`;
    try {
        const result = await axios.post(endpoint,postGenerateImageProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
    
}

export const editImage = async (editImageProps: IEditImageProps) => {
    const endpoint = `${api_url}/${ENDPOINT.IMAGE_EDIT}`;
    try {
        const result = await axios.post(endpoint,editImageProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getPrompts = async () => {
    const endpoint = `${api_url}/${ENDPOINT.PROMPTS}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}