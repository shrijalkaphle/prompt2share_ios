import { useEffect, useState } from "react"
import { StyledImage, StyledScrollView, StyledText, StyledView } from "../../helpers/NativeWind.helper"
import { LoadingPost } from "../core/LoadingPost"
import { IPost } from "../../types/models.type"
import { getPost } from "../../services/post.service"
import { PostCard } from "../core/PostCard"
import { FloatingButton } from "../core/FloatingButton"

export const PostScreen = ({navigation}: any) => {

    const [pageLoading, setPageLoading] = useState<boolean>(true)
    const [dataLoading, setDataLoading] = useState<boolean>(true)
    const [posts, setPosts] = useState<IPost[]>([])
    const [page, setPage] = useState<number>(1)

    let params = {
        page: page,
        perPage: 10
    }

    const getPosts = async () => {
        const response = await getPost(params)
        setPosts([...posts, ...response.data])
        setPageLoading(false)
        setDataLoading(false)
    }

    const updatePageCount = () => {
        setPage(page + 1)
        setDataLoading(true)
        getPosts()
    }
    useEffect(() => {
        getPosts()
    }, [page])
    return (
        <StyledView className="w-full h-full">
            <FloatingButton navigation={navigation} />
            <StyledScrollView className="bg-background p-4">
                {
                    dataLoading ?
                        <LoadingPost />
                        :
                        <StyledView className="pb-24">
                            {
                                posts.map((post: IPost, index: number) => (
                                    <PostCard key={index} post={post} navigation={navigation} />
                                ))
                            }

                        </StyledView>
                }

            </StyledScrollView>
        </StyledView>
    )
}