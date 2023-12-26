import { StyledActivityIndicator, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useStripe, isPlatformPaySupported, PlatformPayButton, PlatformPay, confirmPlatformPayPayment } from '@stripe/stripe-react-native';
import { completeCoinPurchase, generatePaymentIntent, updatePaymentIntent } from "../services/payment.service";
import Toast from "react-native-root-toast";
import * as Linking from 'expo-linking';
import { ICompletePurchaseProps, IUpdatePaymentIntentPropos } from "../types/services/payment.type";
import { Alert, Platform } from "react-native";
import { ButtonType } from "@stripe/stripe-react-native/lib/typescript/src/types/PlatformPay";

export const PurchaseScreen = ({ navigation }: any) => {
    const rate = 96
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [amount, setAmount] = useState<string>('1')
    const [paymentIntent, setPaymentIntent] = useState<any>()

    const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false)

    const [isPlatformpaySupported, setIsPlatformpaySupported] = useState(false);

    const initializePaymentSheet = async () => {
        const intentResponse = await generatePaymentIntent({amount: 12})
        if (intentResponse && intentResponse.error) {
            Toast.show(intentResponse.error)
            return
        }
        setPaymentIntent(intentResponse.intent)
        const { error } = await initPaymentSheet({
            merchantDisplayName: 'Prompt to Share',
            paymentIntentClientSecret: intentResponse.intent.client_secret,
            style: 'alwaysDark',
            googlePay: {
                merchantCountryCode: 'US',
                testEnv: true,
            },
            applePay: {
                merchantCountryCode: 'US',
                cartItems: [
                    {
                        label: 'Token',
                        amount: `14.00`,
                        paymentType: PlatformPay.PaymentType.Immediate
                    },
                    {
                        label: 'Total',
                        amount: `12.00`,
                        paymentType: PlatformPay.PaymentType.Immediate
                    }
                ],
                buttonType: PlatformPay.ButtonType.Default,
            },
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
        // initializePaymentSheet()
        (async function () {
            const response = await isPlatformPaySupported()
            setIsPlatformpaySupported(response);
            if(!response) {
                initializePaymentSheet()
            }
        })();
    }, [])

    const openPaymentSheet = async () => {
        // check if amount is different
        // if(parseInt(amount)*100 != paymentIntent.amount) {
        //     if (amount == '' || amount == '0') {
        //         Toast.show('Enter a valid amount!', {
        //             containerStyle: {
        //                 backgroundColor: 'red',
        //             }
        //         })
        //         return
        //     }
        // }
        
        // await updateAmount()

        const { error, paymentOption } = await presentPaymentSheet()
        if (error) {
            Toast.show(error.code)
            return
        }
        setPaymentProcessing(true)

        const props: ICompletePurchaseProps = {
            paymentIntentId: paymentIntent.id,
            amount: amount,
            paymentOption: paymentOption ? paymentOption.label : 'card'
        }
        const response = await completeCoinPurchase(props)
        if (response && response.error) {
            Toast.show(response.error)
            return
        }
        navigation.navigate('Home', { screen: 'Profile' })
    }


    const pay = async () => {
        const intentResponse = await generatePaymentIntent({amount: parseInt(amount)})
        if (intentResponse && intentResponse.error) {
            Toast.show(intentResponse.error)
            return
        }
        setPaymentIntent(intentResponse.intent)
        const response = await confirmPlatformPayPayment(
            intentResponse.intent.client_secret,
            {
                applePay: {
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    cartItems: [
                        {
                            label: 'Token',
                            amount: `${amount}.00`,
                            paymentType: PlatformPay.PaymentType.Immediate
                        },
                        {
                            label: 'Total',
                            amount: `12.00`,
                            paymentType: PlatformPay.PaymentType.Immediate
                        }
                    ],
                },
                googlePay: {
                    testEnv: true,
                    currencyCode: 'USD',
                    merchantName: 'Prompt to Share',
                    merchantCountryCode: 'US'
                }
            }
        )
        const { error } = response
        console.log(response)
        if(error)
            Alert.alert(`Error code: ${error.code}`, JSON.stringify(response))
    };

    const updateAmount = async () => {
        const props: IUpdatePaymentIntentPropos = {
            amount: parseInt(amount) * 100,
            payment_intent_id: paymentIntent.id
        }
        // update payment intent
        const intentResponse = await updatePaymentIntent(props)
        if (intentResponse && intentResponse.error) {
            Toast.show(intentResponse.error)
            return
        }
        setPaymentIntent(intentResponse.intent)
    }


    return (
        <StyledView className="w-full h-full bg-background relative">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-col items-center p-4 h-2/3">
                <StyledView className="flex flex-col items-center justify-center">
                    <StyledText className="text-white text-2xl font-bold mt-6">Purchase your token here</StyledText>

                    <StyledView className="w-full bg-white/10 p-4 mt-6 rounded-3xl flex flex-row items-center justify-center">
                        <Ionicons name="logo-usd" size={18} color="white" />
                        <StyledTextInput className={`text-white w-5/6 px-2 text-base ${Platform.OS === 'ios' ? '-mt-2.5' : ''}`} value={amount} onChange={(e) => setAmount(e.nativeEvent.text)} keyboardType="numeric" returnKeyLabel="Pay" placeholderTextColor={'white'} />
                    </StyledView>

                    <StyledText className="text-white text-2xl font-semibold mt-6">{isNaN(rate * parseInt(amount)) ? '0' : rate * parseInt(amount)} coins</StyledText>
                    <StyledText className="text-white text-xs mt-1">$1 = {rate} coins</StyledText>
                </StyledView>
                {
                    isPlatformpaySupported ?
                        <PlatformPayButton
                            onPress={pay}
                            type={PlatformPay.ButtonType.Buy}
                            appearance={PlatformPay.ButtonStyle.Black}
                            borderRadius={4}
                            style={{
                                width: '100%',
                                height: 50,
                                marginTop: 24
                            }}
                        />
                        :
                        <StyledView className="flex w-full mt-6">
                            <StyledTouchableOpacity className="w-full bg-white/10 p-4 mt-6 rounded-full flex items-center justify-center" onPress={openPaymentSheet} disabled={amount === '' || amount === '0'}>
                                <StyledText className="text-white text-lg font-bold">Checkout</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                }
                <StyledText className="text-white text-xs mt-1">{isPlatformpaySupported ? '' : 'Platform pay is not supported in this device. Proceed with credit card.'}</StyledText>
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