import { PureComponent, ReactNode, useEffect, useState } from "react"
import { StyledActivityIndicator, StyledText, StyledView } from "../../helpers/NativeWind.helper"
import { LoadingPost } from "../core/LoadingPost"
import { IPost } from "../../types/models.type"
import { getPost } from "../../services/post.service"
import { PostCard } from "../core/PostCard"
import { FloatingButton } from "../core/FloatingButton"
import { FlatList, Modal } from "react-native"

export const PostScreen = ({ navigation }: any) => {

    const [pageLoading, setPageLoading] = useState<boolean>(true)
    const [dataLoading, setDataLoading] = useState<boolean>(false)
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

    const updatePageCount = (newPage = page+1) => {
        setPage(newPage)
        setDataLoading(true)
    }
    useEffect(() => {
        getPosts()
        navigation.addListener('focus', () => {
            setPosts([])
            if (page == 1) getPosts()
            setPage(1)
            
            // getPosts()
        });
    }, [page])

    const removePost = (id: number) => {
        setPosts(posts.filter((post: IPost) => parseInt(post.id) != id))
    }

    return (
        <StyledView className="w-full h-full bg-background">
            <FloatingButton navigation={navigation} />
            {
                posts.length != 0 ?
                    <FlatList data={posts} renderItem={({ item, index }) => <StyledView className={`px-4 ${index == posts.length-1 ? 'mb-24' : ''}`}><PostCard post={item} navigation={navigation} removePost={removePost}/></StyledView>} onEndReached={() => { if (!dataLoading) updatePageCount(); return }} style={{ borderColor: 'white' }} />
                    :
                    <StyledView className="px-4"><LoadingPost /></StyledView>
            }
            <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
        </StyledView>
    )
}