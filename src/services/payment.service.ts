import axios from "axios";
import { ENDPOINT } from "../enum/endpoint.enum";
import { ICompletePurchaseProps, IPaymentIntentProps, IUpdatePaymentIntentPropos, IWithdrawRequestProps } from "../types/services/payment.type";


const api_url = process.env.EXPO_PUBLIC_API_URL;
export const generatePaymentIntent = async (paymentIntentProps: IPaymentIntentProps) => {
    const endpoint = `${api_url}/${ENDPOINT.CREATE_PAYMENT_INTENT}`;
    try {
        const result = await axios.post(endpoint,paymentIntentProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
    
}

export const updatePaymentIntent = async (updatePaymentIntentProps: IUpdatePaymentIntentPropos) => {
    const endpoint = `${api_url}/${ENDPOINT.UPDATE_PAYMENT_INTENT}`;
    try {
        const result = await axios.post(endpoint, updatePaymentIntentProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
    
}

export const completeCoinPurchase = async (completePurchaseProps:ICompletePurchaseProps) => {
    const endpoint = `${api_url}/${ENDPOINT.COMPLETE_PAYMENT}`;
    try {
        const result = await axios.post(endpoint, completePurchaseProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}


export const withdrawRequest = async (withdrawRequestProps: IWithdrawRequestProps) => {
    const endpoint = `${api_url}/${ENDPOINT.WITHDRAW_REQUEST}`;
    try {
        const result = await axios.post(endpoint, withdrawRequestProps)
        return result.data
    } catch (error) {
        return { error: true, message: (error as any).response.data.message }
    }
}