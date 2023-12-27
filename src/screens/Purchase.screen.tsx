import { StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export const PurchaseScreen = ({ navigation }: any) => {
    const rate = 96

    const [amount, setAmount] = useState<string>('1')

    const proceedToPay = () => {
        navigation.navigate('Checkout', { amount: amount})
    }

    return (
        <StyledView className="w-full h-full bg-background relative">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-col items-center p-4 h-2/3">
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-2xl font-bold mt-6">Purchase your token here</StyledText>

                    <StyledView className="w-full bg-white/10 p-4 mt-6 rounded-3xl flex flex-row items-center justify-center">
                        <Ionicons name="logo-usd" size={18} color="white" />
                        <StyledTextInput className={`text-white w-5/6 px-2 text-base ${Platform.OS === 'ios' ? '-mt-2.5' : ''}`}
                            value={amount} onChangeText={setAmount}
                            keyboardType="numeric" returnKeyLabel="Pay" placeholderTextColor={'white'} />
                    </StyledView>

                    <StyledText className="text-white text-2xl font-semibold mt-6">{isNaN(rate * parseInt(amount)) ? '0' : rate * parseInt(amount)} coins</StyledText>
                    <StyledText className="text-white text-xs mt-1">$1 = {rate} coins</StyledText>
                </StyledView>
                <StyledView className="flex w-full mt-6">
                    <StyledTouchableOpacity className="w-full bg-white/10 p-4 mt-6 rounded-full flex items-center justify-center" onPress={proceedToPay} disabled={amount === '' || amount === '0'}>
                        <StyledText className="text-white text-lg font-bold">Proceed to pay</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
            {/* {
                paymentProcessing && <StyledView className="bg-black/60 absolute inset-0 h-full w-full z-9 flex items-center justify-center px-12">
                    <StyledActivityIndicator size={"large"}></StyledActivityIndicator>
                    <StyledText className="text-white text-lg font-semibold mt-8">We are processing your payment. Please wait. You will be automaticately redirected to profile tab after complete.</StyledText>
                </StyledView>
            } */}
        </StyledView>
    )
}