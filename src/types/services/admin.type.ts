export interface IGetAllUser {
    perPage?: number
    page?: number
}

export interface IBlockStatusProps {
    user_id: string
}

export interface IWithdrawStatusProps {
    withdraw_id: string
    sender_account: string
    sender_receipt: string
}

export interface IUpdatePrompt {
    prompt_id: string
    name: string
}

export interface ICreatePrompt {
    name: string
}

export interface IUpdateNotice {
    notice_id: string
    name: string
}

export interface ICreateNotice {
    name: string
}