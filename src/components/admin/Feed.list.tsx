import { useEffect, useState } from "react"
import { StyledActivityIndicator, StyledText, StyledView } from "../../helpers/NativeWind.helper"
import { IPost } from "../../types/models.type"
import { getAllFeeds } from "../../services/admin.service"
import { FlatList } from "react-native"
import { FeedDetail } from "./components/FeedDetail"

export const FeedList = () => {
    const [feeds, setFeeds] = useState<IPost[]>([])
    const [page, setPage] = useState<number>(1)

    const [hasMore, setHasMore] = useState<boolean>(false)

    const [dataLoading, setDataLoading] = useState<boolean>(true)

    const loadOrders = async () => {
        const props = {
            page: page,
            perPage: 20
        }

        const response = await getAllFeeds(props)
        if (response.total_page > page) setHasMore(true)
        setFeeds([...feeds, ...response.data])
        setDataLoading(false)
    }

    const updatePageCount = () => {
        if (!hasMore) return
        setPage(page + 1)
        setDataLoading(true)
    }
    
    const removePost = (id: string) => {
        setFeeds(feeds.filter((feed) => feed.id !== id))
    }
    useEffect(() => {
        loadOrders()
    }, [page])
    return (
        <>
            <StyledView className="p-4">
                <FlatList
                    data={feeds}
                    renderItem={({ item }) => <FeedDetail post={item} removePost={removePost} />}
                    onEndReached={() => { (!dataLoading) ? updatePageCount() : '' }} />
            </StyledView>
            <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
        </>
    )
}