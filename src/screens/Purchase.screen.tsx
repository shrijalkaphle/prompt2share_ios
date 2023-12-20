import { StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export const PurchaseScreen = ({ navigation }: any) => {
    const rate = 96

    const [amount, setAmount] = useState<string>('1')
    return (
        <StyledView className="w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-col items-center justify-between p-4 h-2/3">
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-2xl font-bold mt-6">Purchase your token here</StyledText>

                    <StyledView className="w-full bg-white/10 p-4 mt-6 rounded-3xl flex flex-row items-center">
                        <Ionicons name="logo-usd" size={24} color="white" />
                        <StyledTextInput className="text-white w-5/6 px-2 text-lg" value={amount} onChange={(e) => setAmount(e.nativeEvent.text)} keyboardType="numeric" />
                    </StyledView>

                    <StyledText className="text-white text-2xl font-semibold mt-6">{isNaN(rate * parseInt(amount)) ? '0' : rate * parseInt(amount)} coins</StyledText>
                    <StyledText className="text-white text-xs mt-1">$1 = {rate} coins</StyledText>
                </StyledView>

                <StyledView className="flex w-full">
                    <StyledTouchableOpacity className="w-full bg-white/10 p-4 mt-6 rounded-full flex items-center justify-center">
                        <StyledText className="text-white text-lg font-bold">Purchase</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledView>
    )
}