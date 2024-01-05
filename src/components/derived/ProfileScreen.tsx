import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { IPost } from "../../types/models.type";
import { getUserPost } from "../../services/post.service";
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper";
import { PostCard } from "../core/PostCard";
import { LoadingPost } from "../core/LoadingPost";
import { FloatingButton } from "../core/FloatingButton";
import { FlatList } from "react-native";
import Toast from "react-native-root-toast";
import { Rating } from 'react-native-stock-star-rating'
import { DeleteProfileModal } from "../core/DeleteProfileModal";
import { PostProcessing } from "../core/PostProcessing";
import { Ionicons } from "@expo/vector-icons";

export const ProfileScreen = ({ navigation, route }: any) => {
    const { authUser } = useAuth();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [page, setPage] = useState<number>(1);

    const [dataLoading, setDataLoading] = useState<boolean>(false)
    const [pageLoading, setPageLoading] = useState<boolean>(true)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const [deleteModelState, setDeleteModelState] = useState<boolean>(false)

    let params = {
        page: page,
        perPage: 10
    }
    const getPosts = async () => {
        const response = await getUserPost(params)
        if (response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            setDataLoading(false)
            return
        }
        if (posts.length == 0) setPosts(response.data)
        else setPosts([...posts, ...response.data])

        if (response.total_page > page) setHasMore(true)
        else setHasMore(false)

        setDataLoading(false)
        setPageLoading(false)
    }

    useEffect(() => {
        getPosts()
        navigation.addListener('focus', () => {
            setPosts([])
            if(page == 1) {
                setDataLoading(true)
                getPosts()
            } else {
                setPage(1)
                setDataLoading(true)
            }
        });
    }, [page])

    const updatePageCount = () => {
        if (!hasMore) return
        setPage(page + 1)
        setDataLoading(true)
    }

    const removePost = (id: number) => {
        setPosts(posts.filter((post: IPost) => parseInt(post.id) != id))
    }

    const headerContent = () => {
        return (
            <StyledView className="">
                <StyledView className="w-full bg-white/10 p-4 rounded-lg flex flex-col items-center justify-between gap-y-4 mt-[2px] relative">
                    <StyledView className="h-32 w-36 rounded-full">
                        <StyledImage source={{
                            uri: authUser?.profile ? authUser?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png"
                        }} className="h-full w-full rounded-full" />
                    </StyledView>
                    <StyledView className="flex flex-col items-center gap-y-2">
                        <StyledText className="text-white text-2xl font-bold">{authUser?.name}</StyledText>
                        <StyledText className="text-white text-xl font-semibold">Level: {authUser?.level ? authUser?.level : '0'}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-row items-center justify-center">
                        <Rating stars={authUser?.average_rating} maxStars={5} size={18} />
                        <StyledText className="text-white text-xs ml-1 font-semibold">({authUser?.average_rating ? authUser?.average_rating.toFixed(2) : 0}/5)</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-row justify-around items-center w-full">

                        <StyledTouchableOpacity className="bg-white/10 rounded py-2 px-5" onPress={() => navigation.navigate('PurchaseCoin')}>
                            <StyledText className="text-white">Purchase Coins</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className="flex items-center juistify-center absolute -top-2 right-2">
                        <StyledTouchableOpacity className="rounded-full p-4 bg-white/10" onPress={() => navigation.navigate('EditProfile')}>
                            <Ionicons name="create-outline" size={18} color="white" />
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className="rounded-full p-4 bg-white/10 mt-2" onPress={() => setDeleteModelState(true)}>
                            <Ionicons name="trash-outline" size={18} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>


                </StyledView>
                <StyledScrollView horizontal={true} className="my-4 h-16">
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Available Coins</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.token_balance}</StyledText>
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
                        <StyledText className="text-white font-bold">Reward given</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.reward_given}</StyledText>
                    </StyledView>
                    <StyledView className="flex flex-col items-center bg-white/10 rounded p-4 w-36 mx-2">
                        <StyledText className="text-white font-bold">Trophy given</StyledText>
                        <StyledText className="text-white text-sm font-base">{authUser?.trophy_given}</StyledText>
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
                    posts.length != 0 || !pageLoading ?
                        <FlatList
                            data={posts}
                            renderItem={({ item, index }) => {
                                return (
                                    <StyledView className={`${index == posts.length - 1 ? 'mb-24' : ''}`}>
                                        {
                                            item.status == 'processing' ? <PostProcessing post={item} /> : <PostCard post={item} navigation={navigation} removePost={removePost} />
                                        }

                                    </StyledView>
                                )
                            }} onEndReached={() => { (!dataLoading) ? updatePageCount() : '' }}
                            style={{ borderColor: 'white' }}
                            ListHeaderComponent={() => headerContent()}
                        />
                        :
                        <LoadingPost />
                }
            </StyledView>
            <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
            <DeleteProfileModal modelState={deleteModelState} setModelState={setDeleteModelState} />
        </StyledView>

    )
}