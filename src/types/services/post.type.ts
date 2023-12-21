import { IPostType } from "../../screens/CreatePost.screen"
import { IPost, IPostComment } from "../models.type"

export interface IGetPostParams {
    perPage: number
    page: number
}

export interface IPostResponse {
    data: IPost[]
    page_number: number
    page_size: number
    total_data: number
}

export interface ILikePostResponse {
    status: string
}

export interface ILikeProps {
    id: number
}

export interface ICommentProps {
    id: number
    comment: string
}

export interface ICommentResponse {
    error?: boolean
    status?: boolean
    message: string
    comment: IPostComment[]
}

export interface ICreatePostProps {
    title: string
    category: string
    chunk: string
}

export interface ICreateManualPostProps {
    prompt: string
    file: string | null
    imageProvider: string | null
    chunk: string | null
    postType: IPostType
}