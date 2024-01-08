import moment from "moment";
import { StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper";
import { IWithdraw } from "../../../types/models.type";
import { useState } from "react";
import { WithdrawEditModal } from "./WithdrawEdit.modal";
import { rejectWithdrawRequest } from "../../../services/admin.service";
import Toast from "react-native-root-toast";

export const WithdrawDetail = (_withdraw: IWithdraw) => {
    const [withdraw, setWithdraw] = useState<IWithdraw>(_withdraw)
    const { id, created_at, amount, bank_name, status, account_number, routing_number, sender_account, sender_receipt } = withdraw
    const [showMore, setShowMore] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    
    const rejectWithdraw = async () => {
        const response = await rejectWithdrawRequest(id)
        if (response && response.error) {
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)
        setWithdraw(response.withdraw)
    }
    return (
        <StyledView className="my-1">
            <StyledTouchableOpacity className={`w-full bg-white/10 p-4 flex flex-row justify-between items-center ${showMore ? 'rounded-t-xl' : 'rounded-xl'}`} onPress={() => setShowMore(!showMore)}>
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-base font-bold">{moment(created_at).format('DD')}</StyledText>
                    <StyledText className="text-white text-sm font-medium">{moment(created_at).format('MMM, YY')}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col">
                    <StyledText className="text-white text-base font-medium">${amount}</StyledText>
                    <StyledText className="text-white text-xs font-base uppercase">{bank_name}</StyledText>
                </StyledView>
                {
                    ((status.toLowerCase() === 'paid') || (status.toLowerCase() === 'rejected')) ?
                        <StyledText className={`text-white font-bold capitalize ${status.toLowerCase() === 'rejected' ? 'text-red-500' : 'text-green-500'}`}>{status}</StyledText>
                        :
                        <StyledView>
                        <StyledTouchableOpacity className="bg-white/10 p-2 rounded-lg" onPress={() => setEditModal(true)}>
                            <StyledText className="text-white">Accept</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className="bg-white/10 p-2 rounded-lg mt-2" onPress={rejectWithdraw}>
                            <StyledText className="text-white">Reject</StyledText>
                        </StyledTouchableOpacity>
                        </StyledView>
                }
            </StyledTouchableOpacity>
            <StyledView className={`w-full bg-white/10 p-4 flex flex-row justify-between items-center rounded-b-xl ${showMore ? '' : 'hidden'}`}>
                <StyledView className="flex flex-row justify-between border-t border-white/10 w-full p-3">
                    <StyledView>
                        <StyledText className="text-white font-bold underline">Reciving Details</StyledText>
                        <StyledText className="text-white font-base capitalize mt-1">{bank_name}</StyledText>
                        <StyledText className="text-white font-base">{routing_number}</StyledText>
                        <StyledText className="text-white font-base">{account_number}</StyledText>
                    </StyledView>
                    <StyledView>
                        <StyledText className="text-white font-bold underline">Sender Details</StyledText>
                        <StyledText className="text-white font-base mt-1">{sender_receipt}</StyledText>
                        <StyledText className="text-white font-base">{sender_account}</StyledText>
                    </StyledView>
                </StyledView>

            </StyledView>
            <WithdrawEditModal modelState={editModal} setModelState={setEditModal} withdrawId={id} setWithdraw={setWithdraw} />
        </StyledView>
    )
}