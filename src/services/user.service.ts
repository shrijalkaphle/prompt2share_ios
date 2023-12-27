import axios from "axios";
import { ENDPOINT } from "../enum/endpoint.enum";
import { IReportProblem } from "../types/services/user.type";


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