import { useEffect, useState } from "react"
import { FlatList } from "react-native"
import { IUser } from "../../types/models.type"
import { UserDetail } from "./components/UserDetail"
import { getAllUsers } from "../../services/admin.service"
import { StyledActivityIndicator, StyledText, StyledView } from "../../helpers/NativeWind.helper"

export const UserList = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [page, setPage] = useState<number>(1)

    const [hasMore, setHasMore] = useState<boolean>(false)

    const [dataLoading, setDataLoading] = useState<boolean>(true)

    const loadUsers = async () => {
        const props = {
            page: page,
            perPage: 20
        }

        const response = await getAllUsers(props)
        if (response.total_page > page) setHasMore(true)
        setUsers([...users, ...response.data])
        setDataLoading(false)
    }

    const updatePageCount = () => {
        if(!hasMore) return
        setPage(page + 1)
        setDataLoading(true)
    }

    useEffect(() => {
        loadUsers()
    }, [page])
    return (
        <>
            <StyledView className="p-4">
                <FlatList 
                    data={users} 
                    renderItem={({ item }) => <UserDetail {...item} />} 
                    onEndReached={() => { (!dataLoading) ? updatePageCount() : '' }} />
            </StyledView>
            <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
        </>
    )
}