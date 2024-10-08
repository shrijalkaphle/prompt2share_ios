export interface ILoginParams {
    email: string
    password: string
}

export interface IRegisterParams {
    name: string
    email: string
    password: string
    confirm_password: string
}

export interface IAuthResponse {
    access_token: string
    message?:string
    user: IUserResponse
}

export interface IUserResponse {
    user_id: string
    name: string
    email: string
    token_balance: string
    profile: string
    reward_given: string
    reward_received: string
    trophy_given: string
    trophy_received: string
    generate_history: string
    total_price: string
    report_count: string
}

export interface IGetUserNotificationParams {
    page: number
    perPage: number
}

export interface IUpdatePasswordParams {
    user_id: string
    password: string
    confirm_password: string
}

export interface IUpdateDetailParams {
    name: string
    email: string
}

export interface IVerifyRegisterParams {
    otp: string
    email: string
}

export interface IVerifAccountParams {
    email: string
}

export interface IVerifyPasswordResetParams {
    otp: string
    email: string
}

export interface IPasswordChangeParams {
    password: string
    confirm_password: string
    user_id: string
}

export interface IProviderLoginProps {
    provider: string
    provider_id: string
    name: string
    email: string
}