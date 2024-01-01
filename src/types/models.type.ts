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
    level: number
    isFollowed?: boolean
    average_rating: number
    rating_count: number
}

export interface IPost {
    category: string
    chunk: string
    slug: string
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
    status: string | null
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

export interface IBought {
    qty: number
    price: number
    created_at: string
    id: string
    payment_type: string
}

export interface IWithdraw {
    amount: string
    status: string
    bank_name: string
    routing_number: string
    account_number: string
    created_at: string
    id: string
    sender_account: string
    sender_receipt: string
}

export interface INotification {
    id: number
    message: string
    is_read: boolean
    created_at: string
    
}

export interface IPrompt {
    name: string
    id: string
    created_at: string
}