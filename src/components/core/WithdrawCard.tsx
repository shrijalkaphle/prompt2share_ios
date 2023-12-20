import moment from "moment"
import { StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useState } from "react"

interface IWithdrawCardProps {
    bank_name: string
    routing_name: string
    account_num: string
    created_at: string
    amt: string
    status: string
    sender_account: string
    sender_receipt: string
}

export const WithdrawCard = ({ bank_name, routing_name, account_num, created_at, amt, status, sender_account, sender_receipt }: IWithdrawCardProps) => {

    const [showMore, setShowMore] = useState<boolean>(false)

    return (
        <StyledView className="my-1">
            <StyledTouchableOpacity className={`w-full bg-white/10 p-4 flex flex-row justify-between items-center ${showMore ? 'rounded-t-xl' : 'rounded-xl'}`} onPress={() => setShowMore(!showMore)}>
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-base font-bold">{moment(created_at).format('DD')}</StyledText>
                    <StyledText className="text-white text-sm font-medium">{moment(created_at).format('MMM, YY')}</StyledText>
                </StyledView>
                <StyledView className="flex flex-col">
                    <StyledText className="text-white text-base font-medium">${amt}</StyledText>
                    <StyledText className="text-white text-xs font-base uppercase">{bank_name}</StyledText>
                </StyledView>
                <StyledText className="text-white text-lg font-bold capitalize">{status}</StyledText>
            </StyledTouchableOpacity>
            <StyledView className={`w-full bg-white/10 p-4 flex flex-row justify-between items-center rounded-b-xl ${showMore ? '' : 'hidden'}`}>
                <StyledView className="flex flex-row justify-between border-t border-white/10 w-full p-3">
                    <StyledView>
                        <StyledText className="text-white font-bold underline">Reciving Details</StyledText>
                        <StyledText className="text-white font-base capitalize mt-1">{bank_name}</StyledText>
                        <StyledText className="text-white font-base">{routing_name}</StyledText>
                        <StyledText className="text-white font-base">{account_num}</StyledText>
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