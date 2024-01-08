import { useEffect, useState } from "react"
import { StyledActivityIndicator, StyledText, StyledView } from "../../helpers/NativeWind.helper"
import { IWithdraw } from "../../types/models.type"
import { getAllWithdraws } from "../../services/admin.service"
import { FlatList } from "react-native"
import { WithdrawDetail } from "./components/WithdrawDetail"

export const WithdrawList = () => {
    const [withdraws, setWithdraws] = useState<IWithdraw[]>([])
    const [page, setPage] = useState<number>(1)

    const [hasMore, setHasMore] = useState<boolean>(false)

    const [dataLoading, setDataLoading] = useState<boolean>(true)

    const loadWithdraws = async () => {
        const props = {
            page: page,
            perPage: 20
        }

        const response = await getAllWithdraws(props)
        if (response.total_page > page) setHasMore(true)
        setWithdraws([...withdraws, ...response.data])
        setDataLoading(false)
    }

    const updatePageCount = () => {
        if (!hasMore) return
        setPage(page + 1)
        setDataLoading(true)
    }

    useEffect(() => {
        loadWithdraws()
    }, [page])
    return (
        <>
            <StyledView className="p-4">
                <FlatList
                    data={withdraws}
                    renderItem={({ item }) => <WithdrawDetail {...item} />}
                    onEndReached={() => { (!dataLoading) ? updatePageCount() : '' }} />
            </StyledView>
            <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
        </>
    )
}