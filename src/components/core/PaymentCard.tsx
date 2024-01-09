import moment from "moment"
import { StyledText, StyledView } from "../../helpers/NativeWind.helper"

interface IPaymentCardProps {
    date: string
    amount: number
    qty: number
    payment_type: string
}

export const PaymentCard = ({date, amount, qty, payment_type}: IPaymentCardProps) => {

    return (
        <StyledView className="w-full bg-white/10 p-4 flex flex-row justify-between items-center rounded-xl my-1">
            <StyledView className="flex flex-col items-center justify-center">
                <StyledText className="text-white text-sm font-bold">{moment(date).format('DD')}</StyledText>
                <StyledText className="text-white text-xs font-medium">{moment(date).format('MMM, YY')}</StyledText>
            </StyledView>
            <StyledView className="flex flex-col">
                <StyledText className="text-white text-sm font-medium">Coins: {qty}</StyledText>
                <StyledText className="text-white text-xs font-base uppercase">{payment_type}</StyledText>
            </StyledView>
            <StyledText className="text-white font-bold">${amount}</StyledText>
        </StyledView>
    )
}