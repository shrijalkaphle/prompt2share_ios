import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_CONSTANTS } from "../enum/auth.enum";
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { UserPostCard } from "../components/UserPostCard";
import { IPost } from "../types/models.type";
import { me } from "../services/auth.service";
import { IUserResponse } from "../types/services/auth.type";
import { getUserPost } from "../services/post.service";
import { IPostResponse } from "../types/services/post.type";
import { PostCard } from "../components/core/PostCard";


export const ProfileScreenPage = ({ navigation }: any) => {
    const { user, setUser } = useContext(UserContext);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [page, setPage] = useState<number>(1);
    const [postLoading, setPostLoading] = useState<boolean>(true);
    
    let params = {
        page: page,
        perPage: 10
    }
    const getPosts = async () => {
        getUserPost(params).then((response: IPostResponse) => {
            setPosts([...posts, ...response.data])
            setPostLoading(false)
        })
    }
    
    useEffect(() => {
        getPosts()
    },[page])

    const updatePageCount = () => {
        setPage(page + 1)
        setPostLoading(true)
    }

    return (
        <StyledScrollView className="bg-background p-4">
            <StyledView className="w-full bg-white/10 p-4 shadow rounded-lg flex flex-col items-center justify-between gap-y-4 mt-[2px]">
                <StyledView className="h-32 w-36 rounded-full">
                    <StyledImage source={{
                        uri: user?.profile ? user?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png"
                    }} className="h-full w-full rounded-full" />
                </StyledView>
                <StyledView className="flex flex-col items-center gap-y-2">
                    <StyledText className="text-white text-2xl font-bold">{user?.name}</StyledText>
                    <StyledText className="text-white text-xl font-semibold">Level: 9</StyledText>
                </StyledView>
                <StyledTouchableOpacity className="border border-white rounded py-2 px-5">
                    <StyledText className="text-white">Edit Profile</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="border border-white rounded py-2 px-5" onPress={() => navigation.navigate('BuyTokenScreen')}>
                    <StyledText className="text-white">Buy Token</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
            <StyledScrollView horizontal={true} className="gap-x-4 my-4">
                <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36">
                    <StyledText className="text-white text-lg font-bold">Reward given</StyledText>
                    <StyledText className="text-white text-base font-base">{user?.reward_given}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36">
                    <StyledText className="text-white text-lg font-bold">Trophy given</StyledText>
                    <StyledText className="text-white text-base font-base">{user?.trophy_given}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36">
                    <StyledText className="text-white text-lg font-bold">Your History</StyledText>
                    <StyledText className="text-white text-base font-base">{user?.generate_history}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36">
                    <StyledText className="text-white text-lg font-bold">Trophy received</StyledText>
                    <StyledText className="text-white text-base font-base">{user?.trophy_received}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36">
                    <StyledText className="text-white text-lg font-bold">Reward received</StyledText>
                    <StyledText className="text-white text-base font-base">{user?.reward_received}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36">
                    <StyledText className="text-white text-lg font-bold">Total price</StyledText>
                    <StyledText className="text-white text-base font-base">{user?.total_price}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36">
                    <StyledText className="text-white text-lg font-bold">Report Problem</StyledText>
                    <StyledText className="text-white text-base font-base">{user?.report_count}</StyledText>
                </StyledView>
            </StyledScrollView>

            <StyledView className="mb-10">
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post}/>
                    ))}
                    {
                        postLoading ?
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
            </StyledView>

        </StyledScrollView>
    )
}