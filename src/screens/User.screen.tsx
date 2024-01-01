import { useEffect, useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { IPost, IUser } from "../types/models.type"
import { PostCard } from "../components/core/PostCard"
import { LoadingPost } from "../components/core/LoadingPost"
import { blockUser, getUserDetail, rateUserProfile } from "../services/user.service"
import { getPostbyUserId, updateFollowStatus } from "../services/post.service"
import { FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Toast from "react-native-root-toast"
import { Rating, RatingInput } from 'react-native-stock-star-rating'
import { IRateUserProfileProps } from "../types/services/user.type"

export const UserScreen = ({ navigation, route }: any) => {
    const { userId } = route.params
    const [pageLoading, setPageLoading] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()
    const [posts, setPosts] = useState<IPost[]>([])
    const [dataLoading, setDataLoading] = useState<boolean>(false)

    const [initialLoading, setInitialLoading] = useState<boolean>(true)

    const [isFollowedLoading, setIsFollowedLoading] = useState<boolean>(false)

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const [rating, setRating] = useState<number>(0)

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
        if (posts.length == 0)
            setPosts(response.data)
        else
            setPosts([...posts, ...response.data])

        if (response.total_page > page)
            setHasMore(true)
        else
            setHasMore(false)
        setDataLoading(false)
        setInitialLoading(false)
    }

    useEffect(() => {
        getUser()
        getPosts()
    }, [page, userId])

    const updatePageCount = () => {
        if (!hasMore) return
        setPage(page + 1)
        setDataLoading(true)
    }

    const handleFollowPressed = async () => {
        setIsFollowedLoading(true)
        const response = await updateFollowStatus({
            user_id: userId
        })
        if (response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            setIsFollowedLoading(false)
            return
        }
        setUser(response)
        setIsFollowedLoading(false)
    }

    const rateUser = async (rating: number) => {
        setRating(rating)

        // update to db
        const props:IRateUserProfileProps = {
            rating: rating,
            profileId: userId
        }

        const response = await rateUserProfile(props)
        if(response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            return
        }

        Toast.show(response.message)
        setUser(response.user)
    }

    const handleBlockUser = async () => {
        const response = await blockUser({
            blockedUserId: userId
        })
        if (response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            return
        }
        Toast.show(response.message)
        navigation.goBack()
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
                    <StyledView className="flex flex-row items-center justify-center">
                        <Rating stars={user?.average_rating} maxStars={5} size={18} />
                        <StyledText className="text-white text-xs ml-1 font-semibold">({user?.average_rating && user?.average_rating.toString().split('.')[1] ? user?.average_rating.toFixed(1) : user?.average_rating}/5)</StyledText>
                    </StyledView>
                    {user?.isFollowed &&
                        <StyledView className="flex items-center justify-center">
                            <StyledText className="text-white text-xs font-semibold">Rate this profile</StyledText>
                            <RatingInput rating={rating} maxStars={5} size={32} bordered={false} setRating={rateUser} />
                        </StyledView>
                    }
                    <StyledView className="flex flex-row justify-around items-center w-full">
                        <StyledTouchableOpacity className="border border-white rounded py-2 px-5 w-1/3 flex items-center" onPress={handleFollowPressed}>
                            {isFollowedLoading ? <StyledActivityIndicator /> : <StyledText className="text-white my-0.5">{user?.isFollowed ? 'Unfollow' : 'Follow'}</StyledText>}
                        </StyledTouchableOpacity>

                        <StyledTouchableOpacity className="border border-white rounded py-2 px-5 w-1/3 flex items-center" onPress={handleBlockUser}>
                            {isFollowedLoading ? <StyledActivityIndicator /> : <StyledText className="text-white my-0.5">Block</StyledText>}
                        </StyledTouchableOpacity>
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
                        <StyledText className="text-white font-bold">History</StyledText>
                        <StyledText className="text-white text-sm font-base">{user?.generate_history}</StyledText>
                    </StyledView>
                </StyledScrollView>
                {!user?.isFollowed &&
                    <StyledView className="h-20 w-full flex items-center justify-center mt-10">
                        <Ionicons name="lock-closed" size={36} color="white" />
                        <StyledText className="text-white text-lg font-bold">Follow {user?.name} to view post.</StyledText>
                    </StyledView>
                }
            </StyledView>
        )
    }

    const removePost = (id: number) => {
        setPosts(posts.filter((post: IPost) => parseInt(post.id) != id))
    }
    
    return (
        <StyledView className="bg-background w-full h-full">
            <AppBarComponent navigation={navigation} hasBack={true} />
            {
                pageLoading ?
                    <StyledActivityIndicator size={"large"} />
                    :
                    <>
                        {
                            user?.isFollowed ?
                                <>
                                    <StyledView className="p-4">
                                        {
                                            !initialLoading ?
                                                <FlatList data={posts} renderItem={({ item, index }) => <StyledView className={`${index == posts.length - 1 ? 'mb-24' : ''}`}><PostCard post={item} navigation={navigation} removePost={removePost}/></StyledView>} onEndReached={() => { if (!dataLoading) updatePageCount(); return }} style={{ borderColor: 'white' }} ListHeaderComponent={() => headerContent()} />
                                                :
                                                <LoadingPost />
                                        }
                                        {(!initialLoading && posts.length == 0) && <StyledView className="h-20 w-full flex items-center justify-center mt-10">
                                            <StyledText className="text-white font-bold">{user?.name} does not have any post.</StyledText>
                                        </StyledView>}

                                    </StyledView>

                                    <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                                        <StyledActivityIndicator />
                                        <StyledText className="ml-2 text-white">Loading</StyledText>
                                    </StyledView>
                                </>
                                :
                                <StyledView className="p-4">
                                    {headerContent()}
                                </StyledView>
                        }
                    </>
            }
        </StyledView>
    )
}