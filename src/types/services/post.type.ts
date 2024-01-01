import { IPostType } from "../../screens/CreatePost.screen"
import { IPost, IPostComment } from "../models.type"

export interface IGetPostParams {
    perPage: number
    page: number
    user_id?: number
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

export interface ICreateManualTextPostProps {
    prompt: string
    chunk: string
}

export interface ICreateManualImagePostProps {
    prompt: string
    file: string
    imageProvider: string
    token: string
}

export interface ICreateManualVideoPostProps {
    prompt: string
    file: string
    token: string
}

export interface IUpdateFollowStatusProps {
    user_id: number
}

export interface IDeletePostProps {
    post_id: number
}

export interface IReportPostProps {
    postId: number
    reason: string
}

export interface IBlockUserProps {
    blockedUserId: number
}