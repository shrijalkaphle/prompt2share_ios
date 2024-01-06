import { StyledText, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
    getProducts,
    initConnection,
    requestPurchase,
    useIAP
} from "react-native-iap";

const isIos = Platform.OS === "ios";
const productSkus = Platform.select({
    ios: ["P2S_Tokens_480","P2S_Tokens_96","P2S_Tokens_960"],
    android: []
});

export const PurchaseScreen = ({ navigation }: any) => {
    const [connectedToStore, setConnectedToStore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        (async function () {
            const isConnected = await initConnection();
            setConnectedToStore(isConnected);
            if(isConnected) {
                if(!productSkus) return
                const products = await getProducts({skus: productSkus})
            }
        })();
    },[])

    return (
        <StyledView className="w-full h-full bg-background relative">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-col items-center p-4 h-2/3">
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-2xl font-bold mt-6">Purchase your token here</StyledText>

                </StyledView>
            </StyledView>
        </StyledView>
    )
}