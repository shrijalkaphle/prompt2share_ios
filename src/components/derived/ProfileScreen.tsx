import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { IPost, IUser } from "../../types/models.type";
import { getUserPost } from "../../services/post.service";
import { IPostResponse } from "../../types/services/post.type";
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper";
import { PostCard } from "../core/PostCard";
import { LoadingPost } from "../core/LoadingPost";
import { FloatingButton } from "../core/FloatingButton";
import { FlatList, Modal } from "react-native";
import { WithdrawModal } from "../core/WithdrawModal";
import { ReportProblemModel } from "../core/ReportProblemModel";


export const ProfileScreen = ({ navigation }: any) => {
    const { authUser } = useAuth();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [page, setPage] = useState<number>(1);

    const [dataLoading, setDataLoading] = useState<boolean>(false)

    let params = {
        page: page,
        perPage: 10
    }
    const getPosts = async () => {
        getUserPost(params).then((response: IPostResponse) => {
            setPosts([...posts, ...response.data])
            setDataLoading(false)
        })
    }

    useEffect(() => {
        getPosts()
    }, [navigation])

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
                            uri: authUser?.profile ? authUser?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png"
                        }} className="h-full w-full rounded-full" />
                    </StyledView>
                    <StyledView className="flex flex-col items-center gap-y-2">
                        <StyledText className="text-white text-2xl font-bold">{authUser?.name}</StyledText>
                        <StyledText className="text-white text-xl font-semibold">Level: {authUser?.level ? authUser?.level : '0'}</StyledText>
                    </StyledView>

                    <StyledView className="flex flex-row justify-around items-center w-full">
                        <StyledTouchableOpacity className="border border-white rounded py-2 px-5" onPress={() => navigation.navigate('EditProfile')}>
                            <StyledText className="text-white">Edit Profile</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className="border border-white rounded py-2 px-5" onPress={() => navigation.navigate('PurchaseCoin')}>
                            <StyledText className="text-white">Purchase Coins</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                </StyledView>
                <StyledScrollView horizontal={true} className="my-4 h-16">
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Reward given</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.reward_given}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Trophy given</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.trophy_given}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Your History</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.generate_history}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Trophy received</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.trophy_received}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Reward received</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.reward_received}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Total price</StyledText>
                        <StyledText className="text-white text-sm font-base">${authUser?.total_price}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Report Problem</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.report_count}</StyledText>
                    </StyledView>
                </StyledScrollView>
            </StyledView>
        )
    }

    return (
        <StyledView className="bg-background w-full h-full">
            <FloatingButton navigation={navigation} />
            <StyledView className="px-4">
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
            </StyledView>
        </StyledView>
    )
}