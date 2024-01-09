import axios from "axios";
import { ENDPOINT } from "../enum/endpoint.enum";
import { IRateUserProfileProps, IReportProblem } from "../types/services/user.type";
import { IBlockUserProps } from "../types/services/post.type";


const api_url = process.env.EXPO_PUBLIC_API_URL;
export const searchQuery = async (searchParams: string) => {
    const endpoint = `${api_url}/${ENDPOINT.SEARCH}?query=${searchParams}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getUserDetail = async (id: number) => {
    const endpoint = `${api_url}/${ENDPOINT.USERS}/${id}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getCircleUsers = async () => {
    const endpoint = `${api_url}/${ENDPOINT.CIRCLE}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const reportProblem = async (reportProblemParams: IReportProblem) => {
    const endpoint = `${api_url}/${ENDPOINT.REPORT_PROBLEM}`;
    try {
        const result = await axios.post(endpoint,reportProblemParams)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const rateUserProfile = async (rateUserProfileProps: IRateUserProfileProps) => {
    const endpoint = `${api_url}/${ENDPOINT.USER_RATING}`;
    try {
        const result = await axios.post(endpoint,rateUserProfileProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const deleteUserProfile = async () => {
    const endpoint = `${api_url}/${ENDPOINT.DELETE_PROFILE}`;
    try {
        const result = await axios.post(endpoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}



export const blockUser = async (blockUserProps: IBlockUserProps) => {
    const endpoint = `${api_url}/${ENDPOINT.BLOCK_USER}`;
    try {
        const result = await axios.post(endpoint,blockUserProps)
        return result.data
    } catch (error) {
        // console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const blockUserList = async () => {
    const endpoint = `${api_url}/${ENDPOINT.BLOCK_USER_LIST}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        // console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}