import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";
import { useState } from "react";
import { useRevenueCat } from "../contexts/RevenueCatProvider";
import { PurchasesPackage } from "react-native-purchases";
import { ICompletePurchaseProps } from "../types/services/payment.type";
import { completeCoinPurchase } from "../services/payment.service";
import Toast from "react-native-root-toast";
import { useAuth } from "../contexts/AuthContext";

export const PurchaseScreen = ({ navigation }: any) => {
    const { packages,purchasePackage } = useRevenueCat();
    const [loading, setLoading] = useState<boolean>(false);
    const {authUser, setAuthUser } = useAuth();

    const processPurchase = async (pack: PurchasesPackage) => {
        if(!purchasePackage) return
        setLoading(true)
        const { status } = await purchasePackage(pack)
        if(status) {
            const props: ICompletePurchaseProps = {
                paymentIntentId: 'inapppayment',
                amount: pack.product.price.toString(),
                paymentOption: 'apple pay'
            }
            const response = await completeCoinPurchase(props)
            if (response && response.error) {
                Toast.show(response.error)
                return
            }
            if(setAuthUser && authUser)
                setAuthUser({...authUser, token_balance: response.token_balance})
            
            navigation.navigate('Home', { screen: 'Profile' })
        }
        setLoading(false)
    }

    return (
        <StyledView className="w-full h-full bg-background relative">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-col items-center p-4">
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-2xl font-bold mt-6">Purchase your token here</StyledText>
                    {/* <StyledText className="text-white">{JSON.stringify(packages)}</StyledText> */}
                </StyledView>
            </StyledView>
            <StyledView className="px-4">
                <StyledView className="h-2/3">
                    {/* <StyledTouchableOpacity className="my-1">
                        <StyledView className="rounded-lg p-4 bg-white/10 flex flex-row items-center justify-between">
                            <StyledView>
                                <StyledText className="text-white">Product Title</StyledText>
                                <StyledText className="text-gray-300 text-sm">Product description</StyledText>
                            </StyledView>
                            <StyledText className="text-white">$9.99</StyledText>
                        </StyledView>
                    </StyledTouchableOpacity> */}
                    {
                        packages.map((pack, index) => {
                            return (
                                <StyledTouchableOpacity className="my-1" key={index} onPress={() => { processPurchase(pack) }}>
                                    <StyledView className="rounded-lg p-4 bg-white/10 flex flex-row items-center justify-between">
                                        <StyledView>
                                            <StyledText className="text-white">{pack.product.title}</StyledText>
                                            <StyledText className="text-gray-300 text-sm">{pack.product.description}</StyledText>
                                        </StyledView>
                                        <StyledText className="text-white">{pack.product.priceString}</StyledText>
                                    </StyledView>
                                </StyledTouchableOpacity>
                            )
                        })
                    }
                </StyledView>
            </StyledView>
            {
                loading && <StyledView className="bg-black/60 absolute inset-0 h-full w-full z-9 flex items-center justify-center px-12">
                    <StyledActivityIndicator size={"large"}></StyledActivityIndicator>
                    <StyledText className="text-white text-lg font-semibold mt-8">We are processing your payment. Please wait. You will be automaticately redirected to profile after complete.</StyledText>
                </StyledView>
            }
        </StyledView>
    )
}