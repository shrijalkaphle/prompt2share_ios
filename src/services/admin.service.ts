import axios from "axios";
import { ENDPOINT } from "../enum/endpoint.enum";
import { IBlockStatusProps, ICreateNotice, ICreatePrompt, IGetAllUser, IUpdateNotice, IUpdatePrompt, IWithdrawStatusProps } from "../types/services/admin.type";
import { ISecurity } from "../types/models.type";

const api_url = process.env.EXPO_PUBLIC_API_URL;

export const getAllUsers = async ({ perPage, page }: IGetAllUser) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_USER_LIST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const updateBlockStatus = async (blockStatusProps: IBlockStatusProps) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_BLOCK_USER}`;
    try {
        const result = await axios.post(endpoint, blockStatusProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getAllOrders = async ({ perPage, page }: IGetAllUser) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_ORDER_LIST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getAllWithdraws = async ({ perPage, page }: IGetAllUser) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_WITHDRAW_LIST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const updateWithdrawStatus = async (withdrawStatusProps: IWithdrawStatusProps) => {
    const { withdraw_id, ...requestProps } = withdrawStatusProps
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_WITHDRAW_LIST}/${withdraw_id}`;
    try {
        const result = await axios.post(endpoint, requestProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const rejectWithdrawRequest = async (withdrawId: string) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_WITHDRAW_LIST}/reject/${withdrawId}`;
    try {
        const result = await axios.post(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getAllPrompts = async ({ perPage, page }: IGetAllUser) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_PROMPTS_LIST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const updatePrompt = async (updatePrompt: IUpdatePrompt) => {
    const { prompt_id, ...requestProps } = updatePrompt
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_PROMPTS_LIST}/${prompt_id}`;
    try {
        const result = await axios.post(endpoint, requestProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const deletePromptById = async (promptId: string) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_PROMPTS_LIST}/${promptId}`;
    try {
        const result = await axios.delete(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const createPrompt = async (createPrompt: ICreatePrompt) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_PROMPTS_LIST}`;
    try {
        const result = await axios.post(endpoint, createPrompt)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getAllNotices = async ({ perPage, page }: IGetAllUser) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_NOTICES_LIST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const updateNotice = async (updateNotice: IUpdateNotice) => {

    const { notice_id, ...requestProps } = updateNotice
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_NOTICES_LIST}/${notice_id}`;
    try {
        const result = await axios.post(endpoint, requestProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }

}

export const createNotice = async (createNotice: ICreateNotice) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_NOTICES_LIST}`;
    try {
        const result = await axios.post(endpoint, createNotice)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const deleteNoticeById = async (noticeId: string) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_NOTICES_LIST}/${noticeId}`;
    try {
        const result = await axios.delete(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getAllReports = async ({ perPage, page }: IGetAllUser) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_REPORTS_LIST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getAllFeeds = async ({ perPage, page }: IGetAllUser) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_FEEDS_LIST}?${perPage && `perPage=${perPage}&`}${page && `page=${page}`}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const deletePostByAdmin = async (postId: string) => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_FEEDS_LIST}/${postId}`;
    try {
        const result = await axios.delete(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const getSecurityDetail = async () => {
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_SECURITY_LIST}`;
    try {
        const result = await axios.get(endpoint)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}

export const updateSecurity = async (updateSecurity: ISecurity) => {
    const { id, ...requestProps } = updateSecurity
    const endpoint = `${api_url}/${ENDPOINT.ADMIN_SECURITY_LIST}/${id}`;
    try {
        const result = await axios.post(endpoint,requestProps)
        return result.data
    } catch (error) {
        console.log(error)
        return { error: true, message: (error as any).response.data.message }
    }
}