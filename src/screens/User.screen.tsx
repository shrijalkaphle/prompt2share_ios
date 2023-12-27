import { useCallback, useEffect, useRef, useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { IPost, IUser } from "../types/models.type"
import { PostCard } from "../components/core/PostCard"
import { LoadingPost } from "../components/core/LoadingPost"
import { getUserDetail } from "../services/user.service"
import { getPostbyUserId } from "../services/post.service"
import { FlatList } from "react-native"

export const UserScreen = ({ navigation, route }: any) => {
    const { userId } = route.params
    const [pageLoading, setPageLoading] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()
    const [posts, setPosts] = useState<IPost[]>([])
    const [dataLoading, setDataLoading] = useState<boolean>(false)

    const [page, setPage] = useState<number>(1)

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
        setDataLoading(false)
    }

    useEffect(() => {
        getUser()
        getPosts()
    }, [userId, page])

    const updatePageCount = () => {
        setPage(page + 1)
        setDataLoading(true)
    }

    const headerContent = () => {
        return (
            <StyledView className="">
                <StyledView className="w-full bg-white/10 p-4 rounded-lg flex flex-col items-center justify-between gap-y-4 mt-[2px]">
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
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Reward given</StyledText>
                        <StyledText className="text-white text-sm font-base">{user?.reward_given}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Trophy given</StyledText>
                        <StyledText className="text-white text-sm font-base">{user?.trophy_given}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Your History</StyledText>
                        <StyledText className="text-white text-sm font-base">{user?.generate_history}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Trophy received</StyledText>
                        <StyledText className="text-white text-sm font-base">{user?.trophy_received}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Reward received</StyledText>
                        <StyledText className="text-white text-sm font-base">{user?.reward_received}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Total price</StyledText>
                        <StyledText className="text-white text-sm font-base">${user?.total_price}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Report Problem</StyledText>
                        <StyledText className="text-white text-sm font-base">{user?.report_count}</StyledText>
                    </StyledView>
                </StyledScrollView>
            </StyledView>
        )
    }


    return (
        <StyledView className="bg-background w-full h-full">
            <AppBarComponent navigation={navigation} hasBack={true} hasTitle={true} title={user?.name} />
            {
                pageLoading ?
                    <StyledActivityIndicator size={"large"}/>
                    :
                    <>
                        <StyledView className="p-4">
                            {
                                posts.length != 0 ?
                                    <FlatList data={posts} renderItem={({ item, index }) => <StyledView className={`${index == posts.length - 1 ? 'mb-24' : ''}`}><PostCard post={item} navigation={navigation} /></StyledView>} onEndReached={() => { if (!dataLoading) updatePageCount(); return }} style={{ borderColor: 'white' }} ListHeaderComponent={() => headerContent()} />
                                    :
                                    <LoadingPost />
                            }
                        </StyledView>
                        <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                            <StyledActivityIndicator />
                            <StyledText className="ml-2 text-white">Loading</StyledText>
                        </StyledView></>
            }
        </StyledView>
    )
}