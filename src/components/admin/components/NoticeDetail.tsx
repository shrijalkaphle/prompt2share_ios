import { useState } from "react";
import { StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper";
import { IBought, INotice } from "../../../types/models.type";
import { NoticeEditModal } from "./NoticeEdit.modal";

interface INoticeDetail {
    _notice: INotice
    deleteNotice: (noticeId: string) => void
}
export const NoticeDetail = ({_notice, deleteNotice}: INoticeDetail) => {
    const [notice, setNotice] = useState<INotice>(_notice)
    const { id, name } = notice
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
                    <StyledTouchableOpacity className="bg-white/10 p-2 rounded-lg mt-2" onPress={() => deleteNotice(id)}>
                        <StyledText className="text-white">Delete</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
            <NoticeEditModal modelState={editModal} setModelState={setEditModal} notice={notice} setNotice={setNotice} />
        </StyledView>
    )
}