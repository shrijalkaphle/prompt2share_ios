import { useEffect, useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { isPlatformPaySupported, PlatformPayButton, PlatformPay, confirmPlatformPayPayment, ApplePayButton, presentApplePay, confirmPlatformPaySetupIntent, createPlatformPayPaymentMethod } from "@stripe/stripe-react-native";
import { generatePaymentIntent } from "../services/payment.service";
import Toast from "react-native-root-toast";

interface PaymentIntent {
    client_secret: string,
    id: string
}

export const CheckoutIAPScreen = ({ navigation, route }: any) => {
    const rate = 96
    const tax = 0
    const { amount } = route.params
    const [error, setError] = useState<any>({ "error": false, "message": "" })
    const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false)
    const [isApplePaySupported, setIsApplePaySupported] = useState<boolean>(false);

    const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>()

    const [pageInitializing, setPageInitializing] = useState<boolean>(true)

    const pay = async () => {
        if(!paymentIntent) {
            Toast.show('Cannot innitialzie payment.')
            return
        }
        const clientSecret = paymentIntent.client_secret
        const { error, paymentIntent:confirmedPayment } = await confirmPlatformPayPayment(
            clientSecret,
            {
                applePay: {
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    cartItems: [
                        {
                            label: 'P2S',
                            amount: `${amount}.00`,
                            paymentType: PlatformPay.PaymentType.Immediate
                        }
                    ]
                }
            }
        );
        if (error) {
            setError(error)
            alert('payment method not working')
            Toast.show(error.message)
            return
        }
        console.log(confirmedPayment)
    }

    useEffect(() => {
        (async function () {
            const paySupported = await isPlatformPaySupported()
            setIsApplePaySupported(paySupported);
            const { error, intent, message } = await generatePaymentIntent({ amount: amount })
            if(error) {
                setIsApplePaySupported(false)
                Toast.show(message)
                setPageInitializing(false)
                return
            }
            setPaymentIntent(intent)
            setPageInitializing(false)
        })();
    }, [isPlatformPaySupported])
    return (
        <StyledView className="w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-col items-center p-4 h-2/5">
                <StyledText className="text-white text-lg font-bold">Checkout</StyledText>
                <StyledView className="flex flex-row justify-between rounded-lg p-4 bg-white/10 w-full mt-2">
                    <StyledText className="text-white font-bold">Coins</StyledText>
                    <StyledView className="flex">
                        <StyledText className="text-white">{rate * parseInt(amount)} ($1 = {rate})</StyledText>
                    </StyledView>
                    <StyledText className="text-white font-bold">${amount}</StyledText>
                </StyledView>
                <StyledView className="flex flex-row justify-between rounded-lg p-4 bg-white/10 w-full mt-2">
                    <StyledText className="text-white font-bold">Tax</StyledText>
                    <StyledView className="flex">
                        <StyledText className="text-white">{tax}%</StyledText>
                    </StyledView>
                    <StyledText className="text-white font-bold">${parseInt(amount) * tax}</StyledText>
                </StyledView>
                <StyledView className="flex flex-row justify-between rounded-lg p-4 bg-white/10 w-full mt-6">
                    <StyledText className="text-white font-bold">Total</StyledText>

                    <StyledText className="text-white font-bold">${(parseInt(amount) * tax) + parseInt(amount)}</StyledText>
                </StyledView>
            </StyledView>
            <StyledText className="text-white">{JSON.stringify(error)}</StyledText>
            <StyledText className="text-white">{JSON.stringify(paymentIntent?.client_secret)}</StyledText>
            <StyledView className="flex w-full p-4">
                {
                    pageInitializing ?
                    null
                    :
                    <>
                    {
                    isApplePaySupported ?
                        (
                            <ApplePayButton
                                onPress={pay}
                                type='plain'
                                buttonStyle='black'
                                borderRadius={16}
                                style={{
                                    width: '100%',
                                    height: 50,
                                }}
                            />
                        )
                        :
                        <StyledTouchableOpacity className="w-full bg-white/10 p-4 mt-6 rounded-lg flex items-center justify-center" onPress={() => {}}>
                            <StyledText className="text-white text-center font-bold">Apple pay is either not supported or you have not setup apple pay</StyledText>
                        </StyledTouchableOpacity>
                }
                    </>
                }
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