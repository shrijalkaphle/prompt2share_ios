import { StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper";
import { IPrompt } from "../../../types/models.type";
import { useState } from "react";
import { PromptEditModal } from "./PromptEdit.modal";

interface IPromptDetail {
    _prompt: IPrompt
    deletePrompt: (promptId: string) => void
}

export const PromptDetail = ({_prompt, deletePrompt} : IPromptDetail) => {
    const [prompt, setPrompt] = useState<IPrompt>(_prompt)
    const { id, name } = prompt
    const [editModal, setEditModal] = useState<boolean>(false)

    return (
        <StyledView className="my-1">
            <StyledView className="flex flex-row items-center justify-between bg-white/10 p-4">
                <StyledView className="w-2/3">
                    <StyledText className="text-white text-base">{name}</StyledText>
                </StyledView>
                <StyledView>
                    <StyledTouchableOpacity className="bg-white/10 p-2 rounded-lg" onPress={() => setEditModal(true)}>
                        <StyledText className="text-white">Edit</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="bg-white/10 p-2 rounded-lg mt-2" onPress={() => deletePrompt(id)}>
                        <StyledText className="text-white">Delete</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
            <PromptEditModal modelState={editModal} setModelState={setEditModal} prompt={prompt} setPrompt={setPrompt}/>
        </StyledView>
    )
}