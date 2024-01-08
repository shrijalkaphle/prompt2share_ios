import { useEffect, useState } from "react"
import { FlatList } from "react-native"
import { IPrompt } from "../../types/models.type"
import { PromptDetail } from "./components/PromptDetail"
import { deletePromptById, getAllPrompts } from "../../services/admin.service"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import React from "react"
import Toast from "react-native-root-toast"
import { CreatePromptModal } from "./components/CreatePrompt.modal"
import { Ionicons } from "@expo/vector-icons"

// 

export const PromptList = () => {
    const [prompts, setPrompts] = useState<IPrompt[]>([])
    const [page, setPage] = useState<number>(1)

    const [hasMore, setHasMore] = useState<boolean>(false)

    const [dataLoading, setDataLoading] = useState<boolean>(true)

    const [addModal, setAddModal] = useState<boolean>(false)

    const loadPrompts = async () => {
        const props = {
            page: page,
            perPage: 20
        }

        const response = await getAllPrompts(props)
        if (response.total_page > page) setHasMore(true)
        setPrompts([...prompts, ...response.data])
        setDataLoading(false)
    }

    const updatePageCount = () => {
        if(!hasMore) return
        if(dataLoading) return
        setPage(page + 1)
        setDataLoading(true)
    }

    const deletePrompt = async (promptId: string) => {
        const response = await deletePromptById(promptId)
        if(response && response.error) {
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)

        setPrompts(prompts.filter((prompt) => prompt.id !== promptId))
    }

    useEffect(() => {
        loadPrompts()
    }, [page])

    return (
        <>
            <StyledView className="p-4">
                <StyledTouchableOpacity className="p-2 bg-white/10 rounded-lg flex items-center justify-center flex-row mb-4" onPress={() => setAddModal(true)}>
                    <Ionicons name="add" size={18} color="white" /> 
                    <StyledText className="text-white">Add New</StyledText>
                </StyledTouchableOpacity>
                <FlatList
                    data={prompts}
                    renderItem={({ item }) => <PromptDetail _prompt={item} deletePrompt={deletePrompt} />}
                    onEndReached={() => { (!dataLoading) ? updatePageCount() : '' }} />
            </StyledView>
            <StyledView className={`fixed left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading ? '' : 'hidden'}`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
            <CreatePromptModal modelState={addModal} setModelState={setAddModal} setPrompts={setPrompts} prompts={prompts}/>
        </>
    )
}