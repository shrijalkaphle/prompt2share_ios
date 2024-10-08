import moment from "moment"
import { StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useState } from "react"
import { IWithdraw } from "../../types/models.type"


export const WithdrawCard = ({ bank_name, routing_number, account_number, created_at, amount, status, sender_account, sender_receipt }: IWithdraw) => {

    const [showMore, setShowMore] = useState<boolean>(false)

    return (
        <StyledView className="my-1">
            <StyledTouchableOpacity className={`w-full bg-white/10 p-4 flex flex-row justify-between items-center ${showMore ? 'rounded-t-xl' : 'rounded-xl'}`} onPress={() => setShowMore(!showMore)}>
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-sm font-bold">{moment(created_at).format('DD')}</StyledText>
                    <StyledText className="text-white text-xs font-medium">{moment(created_at).format('MMM, YY')}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col">
                    <StyledText className="text-white text-sm font-medium">${amount}</StyledText>
                    <StyledText className="text-white text-xs font-base uppercase">{bank_name}</StyledText>
                </StyledView>
                <StyledText className="text-white font-bold capitalize">{status}</StyledText>
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
        </StyledView>
    )
}