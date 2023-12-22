import { StyledActivityIndicator, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useStripe } from '@stripe/stripe-react-native';
import { completeCoinPurchase, generatePaymentIntent, updatePaymentIntent } from "../services/payment.service";
import Toast from "react-native-root-toast";
import * as Linking from 'expo-linking';
import { ICompletePurchaseProps, IUpdatePaymentIntentPropos } from "../types/services/payment.type";

export const PurchaseScreen = ({ navigation }: any) => {
    const rate = 96
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [amount, setAmount] = useState<string>('1')
    const [paymentIntentId, setPaymentIntentId] = useState<string>('')

    const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false)

    const initializePaymentSheet = async () => {
        const intentResponse = await generatePaymentIntent()
        if (intentResponse && intentResponse.error) {
            Toast.show(intentResponse.error)
            return
        }
        setPaymentIntentId(intentResponse.intent.id)
        const { error } = await initPaymentSheet({
            merchantDisplayName: 'Prompt to Share',
            paymentIntentClientSecret: intentResponse.intent.client_secret,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        })
        if (error) {
            Toast.show(error.code)
            return
        }
    }

    useEffect(() => {
        initializePaymentSheet()
    }, [])

    const openPaymentSheet = async () => {
        const { error, paymentOption } = await presentPaymentSheet()
        if (error) {
            Toast.show(error.code)
            return
        }
        setPaymentProcessing(true)

        const props: ICompletePurchaseProps = {
            paymentIntentId: paymentIntentId,
            amount: amount,
            paymentOption: paymentOption ? paymentOption.label : 'card'
        }
        const response = await completeCoinPurchase(props)
        if (response && response.error) {
            Toast.show(response.error)
            return
        }
        navigation.navigate('Home', { screen: 'ProfileScreen' })
    }

    const updateAmount = async (amount: string) => {
        setAmount(amount)
        if (amount == '' || amount == '0') {
            Toast.show('Enter a valid amount!', {
                containerStyle: {
                    backgroundColor: 'red',
                }
            })
            return
        }
        const props: IUpdatePaymentIntentPropos = {
            amount: parseInt(amount) * 100,
            payment_intent_id: paymentIntentId
        }
        // update payment intent
        const intentResponse = await updatePaymentIntent(props)
        console.log(intentResponse)
    }


    return (
        <StyledView className="w-full h-full bg-background relative">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-col items-center justify-between p-4 h-2/3">
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-2xl font-bold mt-6">Purchase your token here</StyledText>

                    <StyledView className="w-full bg-white/10 p-4 mt-6 rounded-3xl flex flex-row items-center">
                        <Ionicons name="logo-usd" size={24} color="white" />
                        <StyledTextInput className="text-white w-5/6 px-2 text-lg" value={amount} onChange={(e) => updateAmount(e.nativeEvent.text)} keyboardType="numeric" placeholderTextColor={'white'} />
                    </StyledView>

                    <StyledText className="text-white text-2xl font-semibold mt-6">{isNaN(rate * parseInt(amount)) ? '0' : rate * parseInt(amount)} coins</StyledText>
                    <StyledText className="text-white text-xs mt-1">$1 = {rate} coins</StyledText>
                </StyledView>

                <StyledView className="flex w-full mt-6">
                    <StyledTouchableOpacity className="w-full bg-white/10 p-4 mt-6 rounded-full flex items-center justify-center" onPress={openPaymentSheet} disabled={amount === '' || amount === '0'}>
                        <StyledText className="text-white text-lg font-bold">Checkout</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
            {
                paymentProcessing && <StyledView className="bg-black/60 absolute inset-0 h-full w-full z-9 flex items-center justify-center px-12">
                    <StyledActivityIndicator size={"large"}></StyledActivityIndicator>
                    <StyledText className="text-white text-lg font-semibold mt-8">We are processing your payment. Please wait. You will be automaticately redirected to profile tab after complete.</StyledText>
                </StyledView>
            }
        </StyledView>
    )
}