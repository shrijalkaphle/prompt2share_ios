import { StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import {
    requestPurchase,
    useIAP
} from "react-native-iap";

const isIos = Platform.OS === "ios";
const productSkus = Platform.select({
    ios: ["P2S_Tokens_480","P2S_Tokens_96","P2S_Tokens_960"],
});

export const PurchaseScreen = ({ navigation }: any) => {
    const rate = 96
    const {
        connected,
        getProducts
    } = useIAP();

    const [loading, setLoading] = useState<boolean>(false);

    // const handleGetProducts = async () => {
    //     try {
    //         if (!productSkus) return
    //         await getProducts({ skus: productSkus });
    //     } catch (error) {
    //         console.log({ message: "handleGetSubscriptions", error });
    //     }
    // }

    // console.log(connected)
    // useEffect(() => {
    //     handleGetProducts();
    // }, [connected]);

    // const handleBuyToken = async () => {
    //     try {
    //         if (!productSkus) return
    //         setLoading(true);
    //         await requestPurchase({ skus: productSkus });
    //     } catch (error) {
    //         setLoading(false);
    //         console.log({ message: "handleBuyToken", error });
    //     }
    // } 

    const [amount, setAmount] = useState<string>('1')

    const proceedToPay = () => {
        navigation.navigate('CheckoutScreen', { amount: amount })
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
                    <StyledTouchableOpacity className="w-full bg-white/10 p-4 mt-6 rounded-full flex items-center justify-center" onPress={proceedToPay}>
                        <StyledText className="text-white text-lg font-bold">Purchase</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledView>
    )
}