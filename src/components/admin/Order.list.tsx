import { useEffect, useState } from "react"
import { StyledActivityIndicator, StyledText, StyledView } from "../../helpers/NativeWind.helper"
import { IBought } from "../../types/models.type"
import { getAllOrders } from "../../services/admin.service"
import { FlatList } from "react-native"
import { OrderDetail } from "./components/OrderDetail"

export const OrderList = () => {
    const [orders, setOrder] = useState<IBought[]>([])
    const [page, setPage] = useState<number>(1)

    const [hasMore, setHasMore] = useState<boolean>(false)

    const [dataLoading, setDataLoading] = useState<boolean>(true)

    const loadOrders = async () => {
        const props = {
            page: page,
            perPage: 20
        }

        const response = await getAllOrders(props)
        if (response.total_page > page) setHasMore(true)
        setOrder([...orders, ...response.data])
        setDataLoading(false)
    }

    const updatePageCount = () => {
        if (!hasMore) return
        setPage(page + 1)
        setDataLoading(true)
    }

    useEffect(() => {
        loadOrders()
    }, [page])
    return (
        <>
            <StyledView className="p-4">
                <FlatList
                    data={orders}
                    renderItem={({ item }) => <OrderDetail {...item} />}
                    onEndReached={() => { (!dataLoading) ? updatePageCount() : '' }} />
            </StyledView>
            <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
        </>
    )
}