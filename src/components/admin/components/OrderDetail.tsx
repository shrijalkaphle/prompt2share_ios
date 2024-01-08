import { StyledText, StyledView } from "../../../helpers/NativeWind.helper";
import { IBought } from "../../../types/models.type";

export const OrderDetail = (bought: IBought) => {
    const { name, email, price, qty } = bought;

    return (
        <StyledView className="bg-white/10 rounded-lg my-1">
            <StyledView className="p-4 flex flex-row justify-between items-center">
                <StyledView>
                    <StyledText className="text-white font-bold">{name}</StyledText>
                    <StyledText className="text-white text-sm">{email}</StyledText>
                    <StyledText className="text-white text-sm">Token Amount: {qty}</StyledText>
                </StyledView>
                <StyledView>
                    <StyledText className="text-white font-bold">${price}</StyledText>
                </StyledView>
                
                
            </StyledView>
        </StyledView>
    )
}