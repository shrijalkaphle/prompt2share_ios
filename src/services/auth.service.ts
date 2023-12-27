import { ENDPOINT } from "../enum/endpoint.enum";
import axios from "axios";
import { IUpdatePasswordParams, IGetUserNotificationParams, IUpdateDetailParams, IVerifAccountParams, IVerifyPasswordResetParams } from "../types/services/auth.type";

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

export const updateUserPassword = async (changePasswordProps: IUpdatePasswordParams) => {
    const endpoint = `${api_url}/${ENDPOINT.UPDATE_PASSWORD}`
    try {
        const result = await axios.post(endpoint,changePasswordProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const updateUserProfile = async (updateProfileDetailProps: IUpdateDetailParams) => {
    const endpoint = `${api_url}/${ENDPOINT.UPDATE_DETAIL}`
    try {
        const result = await axios.post(endpoint,updateProfileDetailProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const verifyAccountExists = async (veriftAccountProps: IVerifAccountParams) => {
    const endpoint = `${api_url}/${ENDPOINT.VERIFY_ACCOUNT}`
    try {
        const result = await axios.post(endpoint,veriftAccountProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}


export const verifyPasswordResetOTP = async (verifyPasswordResetParams: IVerifyPasswordResetParams) => {
    const endpoint = `${api_url}/${ENDPOINT.VERIFY_PASSWORD_RESET}`
    try {
        const result = await axios.post(endpoint,verifyPasswordResetParams)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}

export const updateForgotPassword = async (changePasswordProps: IUpdatePasswordParams) => {
    const endpoint = `${api_url}/${ENDPOINT.UPDATE_FORGOT_PASSWORD}`
    try {
        const result = await axios.post(endpoint,changePasswordProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}