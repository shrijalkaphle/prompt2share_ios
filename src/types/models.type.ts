export interface IUser {
    email: string
    name: string
    profile: string
    token_balance: string
    user_id: string
    reward_given: string
    reward_received: string
    trophy_given: string
    trophy_received: string
    generate_history: string
    total_price: string
    report_count: string
    level?: number
}

export interface IPost {
    category: string
    chunk: string
    comment: []
    created_at: string
    file: string | null
    id: string
    like: []
    paste_prompt: string
    title: string
    tool: string
    trophy: []
    user?: IUser
}


export interface IPostLike {
    post_id: string
    user_id: string
    name: string
    profile: string
    id: string
    created_at: string | null
} 

export interface IPostTrophy {
    post_id: string
    user_id: string
    name: string
    profile: string
    id: string
} 

export interface IPostComment {
    post_id: string
    user_id: string
    name: string
    profile: string
    id: string
    created_at: string | null
    text: string
} 