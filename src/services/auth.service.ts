import { ENDPOINT } from "../enum/endpoint.enum";
import axios from "axios";
import { IGetUserNotificationParams } from "../types/services/auth.type";

const api_url = process.env.EXPO_PUBLIC_API_URL;

export const getBillingDetails = async () => {
    const endpoint = `${api_url}/${ENDPOINT.BILLING}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getUserNotification = async (getUserNotificationParams: IGetUserNotificationParams) => {
    const endpoint = `${api_url}/${ENDPOINT.NOTIFICATIONS}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}