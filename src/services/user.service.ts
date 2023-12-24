import axios from "axios";
import { ENDPOINT } from "../enum/endpoint.enum";


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