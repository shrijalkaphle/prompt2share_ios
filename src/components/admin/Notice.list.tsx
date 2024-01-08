import { useEffect, useState } from "react"
import { IBought, INotice } from "../../types/models.type"
import { deleteNoticeById, getAllNotices } from "../../services/admin.service"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { FlatList } from "react-native"
import Toast from "react-native-root-toast"
import { NoticeDetail } from "./components/NoticeDetail"
import { CreateNoticeModal } from "./components/CreateNotice.modal"

export const NoticeList = () => {
    const [notices, setNotices] = useState<INotice[]>([])
    const [page, setPage] = useState<number>(1)

    const [hasMore, setHasMore] = useState<boolean>(false)

    const [dataLoading, setDataLoading] = useState<boolean>(true)

    const [addModal, setAddModal] = useState<boolean>(false)

    const loadNotices = async () => {
        const props = {
            page: page,
            perPage: 20
        }

        const response = await getAllNotices(props)
        if (response.total_page > page) setHasMore(true)
        setNotices([...notices, ...response.data])
        setDataLoading(false)
    }

    const updatePageCount = () => {
        if (!hasMore) return
        setPage(page + 1)
        setDataLoading(true)
    }

    const deleteNotice = async (noticeId: string) => {
        const response = await deleteNoticeById(noticeId)
        if(response && response.error) {
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)

        setNotices(notices.filter((notice) => notice.id !== noticeId))
    }

    useEffect(() => {
        loadNotices()
    }, [page])

    return (
        <>
            <StyledView className="p-4">
                <StyledTouchableOpacity className="p-2 bg-white/10 rounded-lg flex items-center justify-center flex-row mb-4" onPress={() => setAddModal(true)}>
                    <Ionicons name="add" size={18} color="white" />
                    <StyledText className="text-white">Add New</StyledText>
                </StyledTouchableOpacity>
                <FlatList
                    data={notices}
                    renderItem={({ item }) => <NoticeDetail _notice={item} deleteNotice={deleteNotice} />}
                    onEndReached={() => { (!dataLoading) ? updatePageCount() : '' }} />
            </StyledView>
            <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
            <CreateNoticeModal modelState={addModal} setModelState={setAddModal} setNotices={setNotices} notices={notices} />
        </>
    )
}