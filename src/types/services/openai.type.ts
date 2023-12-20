export interface IGenerateFeedPostProps {
    prompt: string
    category: string
}

export interface IGenerateImageProps {
    prompt: string
}

export interface IPostGenerateImageProps {
    prompt: string
    category: string
    image_url: string
}