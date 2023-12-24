import { useCallback, useEffect, useRef, useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { IPost, IUser } from "../types/models.type"
import { PostCard } from "../components/core/PostCard"
import { LoadingPost } from "../components/core/LoadingPost"
import { getUserDetail } from "../services/user.service"
import { getPostbyUserId } from "../services/post.service"

export const UserScreen = ({ navigation, route }: any) => {
    const { userId } = route.params
    const [pageLoading, setPageLoading] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()
    const [posts, setPosts] = useState<IPost[]>([])
    const [postLoading, setPostLoading] = useState<boolean>(true)

    const [page, setPage] = useState<number>(1)

    const observer = useRef<any>(null)

    const getUser = async () => {
        if (user) return
        setPageLoading(true)
        const response = await getUserDetail(userId)
        setUser(response)
        setPageLoading(false)
    }

    const getPosts = async () => {
        const props = {
            page: page,
            perPage: 20,
            user_id: userId
        }
        const response = await getPostbyUserId(props)
        setPosts([...posts, ...response.data])
        setPostLoading(false)
    }

    const lasPostElementRef = useCallback((node: any) => {
        if(postLoading) return
        if(observer.current) observer.current.disconnect()

        // observer.current = new IntersectionObserver(entries => {
        //     if(entries[0].isIntersecting) {
        //         console.log("intersecting")
        //     }
        // })
        // if(node) observer.current.observe(node)
    },[postLoading])

    useEffect(() => {
        getUser()
        getPosts()
    }, [])
    return (
        <StyledView className="bg-background w-full h-full">
            <AppBarComponent navigation={navigation} hasBack={true} />
            {pageLoading ? <StyledView className="flex w-full items-center justify-center my-10">
                <StyledActivityIndicator size={"large"}/>
            </StyledView> :
                <StyledScrollView className="p-4">
                    <StyledView className="w-full bg-white/10 p-4 shadow rounded-lg flex flex-col items-center justify-between gap-y-4 mt-[2px]">
                        <StyledView className="h-32 w-36 rounded-full">
                            <StyledImage source={{
                                uri: user?.profile ? user?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png"
                            }} className="h-full w-full rounded-full" />
                        </StyledView>
                        <StyledView className="flex flex-col items-center gap-y-2">
                            <StyledText className="text-white text-2xl font-bold">{user?.name}</StyledText>
                            <StyledText className="text-white text-xl font-semibold">Level: {user?.level ? user?.level : '0'}</StyledText>
                        </StyledView>
                    </StyledView>
                    <StyledScrollView horizontal={true} className="my-4">
                        <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                            <StyledText className="text-white font-bold">Reward given</StyledText>
                            <StyledText className="text-white text-sm font-base">{user?.reward_given}</StyledText>
                        </StyledView>
                        <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                            <StyledText className="text-white font-bold">Trophy given</StyledText>
                            <StyledText className="text-white text-sm font-base">{user?.trophy_given}</StyledText>
                        </StyledView>
                        <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                            <StyledText className="text-white font-bold">Your History</StyledText>
                            <StyledText className="text-white text-sm font-base">{user?.generate_history}</StyledText>
                        </StyledView>
                        <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                            <StyledText className="text-white font-bold">Trophy received</StyledText>
                            <StyledText className="text-white text-sm font-base">{user?.trophy_received}</StyledText>
                        </StyledView>
                        <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                            <StyledText className="text-white font-bold">Reward received</StyledText>
                            <StyledText className="text-white text-sm font-base">{user?.reward_received}</StyledText>
                        </StyledView>
                        <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                            <StyledText className="text-white font-bold">Total price</StyledText>
                            <StyledText className="text-white text-sm font-base">${user?.total_price}</StyledText>
                        </StyledView>
                        <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                            <StyledText className="text-white font-bold">Report Problem</StyledText>
                            <StyledText className="text-white text-sm font-base">{user?.report_count}</StyledText>
                        </StyledView>
                    </StyledScrollView>
                    <StyledView className="mb-24">
                        {posts.map((post, index) => (
                            <StyledView key={index} ref={index == (posts.length - 1) ? lasPostElementRef : null}>
                                <PostCard post={post}/>
                            </StyledView>
                        ))}
                        {postLoading && <LoadingPost />}
                    </StyledView>
                </StyledScrollView>
            }
        </StyledView>
    )
}