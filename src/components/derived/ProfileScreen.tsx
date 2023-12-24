import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { IPost } from "../../types/models.type";
import { getUserPost } from "../../services/post.service";
import { IPostResponse } from "../../types/services/post.type";
import { StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper";
import { PostCard } from "../core/PostCard";
import { LoadingPost } from "../core/LoadingPost";
import { FloatingButton } from "../core/FloatingButton";


export const ProfileScreen = ({ navigation }: any) => {
    const { authUser } = useAuth();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [page, setPage] = useState<number>(1);
    const [postLoading, setPostLoading] = useState<boolean>(true);

    const [hasMoreData, setHasMoreData] = useState<boolean>(false);

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
    }, [navigation])

    const updatePageCount = () => {
        setPage(page + 1)
        setPostLoading(true)
    }

    return (
        <StyledView>
            <FloatingButton navigation={navigation} />
            <StyledScrollView className="bg-background p-4">
                <StyledView className="w-full bg-white/10 p-4 shadow rounded-lg flex flex-col items-center justify-between gap-y-4 mt-[2px]">
                    <StyledView className="h-32 w-36 rounded-full">
                        <StyledImage source={{
                            uri: authUser?.profile ? authUser?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png"
                        }} className="h-full w-full rounded-full" />
                    </StyledView>
                    <StyledView className="flex flex-col items-center gap-y-2">
                        <StyledText className="text-white text-2xl font-bold">{authUser?.name}</StyledText>
                        <StyledText className="text-white text-xl font-semibold">Level: {authUser?.level ? authUser?.level : '0'}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-row gap-x-4 justify-around">
                        <StyledTouchableOpacity className="border border-white rounded py-2 px-5" onPress={() => navigation.navigate('EditProfile')}>
                            <StyledText className="text-white">Edit Profile</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className="border border-white rounded py-2 px-5" onPress={() => navigation.navigate('PurchaseCoin')}>
                            <StyledText className="text-white">Purchase Coins</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
                <StyledScrollView horizontal={true} className="my-4">
                    <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Reward given</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.reward_given}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Trophy given</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.trophy_given}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Your History</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.generate_history}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Trophy received</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.trophy_received}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Reward received</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.reward_received}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Total price</StyledText>
                        <StyledText className="text-white text-sm font-base">${authUser?.total_price}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 shadow rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Report Problem</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.report_count}</StyledText>
                    </StyledView>
                </StyledScrollView>

                <StyledView className="mb-24">
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                    { postLoading && <LoadingPost /> }
                </StyledView>

            </StyledScrollView>
        </StyledView>
    )
}