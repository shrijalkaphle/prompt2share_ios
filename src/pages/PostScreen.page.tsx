import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { StyledScrollView, StyledText, StyledTouchableOpacity, StyledView, StyledActivityIndicator } from "../helpers/NativeWind.helper";
import { IPost } from "../types/models.type";
import { getPost } from "../services/post.service";
import { PostCard } from "../components/core/PostCard";

export const PostScreenPage = () => {
    const user = useContext(UserContext)
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
        <>
            {
                pageLoading
                    ? <StyledView className="bg-background h-full w-full flex items-center justify-center">
                        <StyledActivityIndicator size={"large"} />
                    </StyledView> :
                    <StyledScrollView className="bg-background p-4">
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))}
                        {
                            dataLoading ?
                            <StyledView className="mb-10 flex items-center justify-center">
                                <StyledActivityIndicator size={"large"} />
                            </StyledView>
                            :
                            <StyledView className="mb-10">
                                <StyledTouchableOpacity className="w-full flex items-center justify-center border border-slate-400 p-3 rounded-lg mt-7" onPress={updatePageCount}>
                                    <StyledText className="text-gray-400">Load More</StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                        }
                    </StyledScrollView>
            }
        </>
    )
}