import { useEffect, useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { useStripe, isPlatformPaySupported, PlatformPayButton, PlatformPay, confirmPlatformPayPayment } from "@stripe/stripe-react-native";
import { completeCoinPurchase, generatePaymentIntent } from "../services/payment.service";
import Toast from "react-native-root-toast";
import { ICompletePurchaseProps } from "../types/services/payment.type";

export const CheckoutScreen = ({ navigation, route }: any) => {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [isApplePaySupported, setIsApplePaySupported] = useState<boolean>(false);

    const rate = 96
    const tax = 0
    const { amount } = route.params
    const [error, setError] = useState<any>({ "error": false, "message": "" })
    const [paymentIntent, setPaymentIntent] = useState<any>()
    const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false)

    const initializePaymentSheet = async () => {
        const response = await generatePaymentIntent({ amount: amount })
        if (response.error) {
            setError(response.error)
            Toast.show(response.message)
            return
        }
        const { intent, ephemeralKey, customerId } = response
        setPaymentIntent(intent)
        const { error } = await initPaymentSheet({
            merchantDisplayName: "P2S",
            paymentIntentClientSecret: intent.client_secret,
            customerId: customerId,
            customerEphemeralKeySecret: ephemeralKey.secret,
            applePay: { merchantCountryCode: "US" },
            googlePay: { merchantCountryCode: "US", testEnv: true, },
            primaryButtonLabel: "Pay",
            style: "automatic",
            customFlow: false,
            allowsDelayedPaymentMethods: true,

        })
        if (error) {
            setError(error)
            Toast.show(error.message)
            return
        }
    }

    const openPaymentSheet = async () => {
        const { error, paymentOption } = await presentPaymentSheet()
        if (error) {
            setError(error)
            Toast.show(error.message)
            return
        }

        // complete payment
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
        const clientSecret = paymentIntent.client_secret
        const { error } = await confirmPlatformPayPayment(
            clientSecret,
            {
                applePay: {
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    cartItems: [
                        {
                            label: 'P2S',
                            amount: amount,
                            paymentType: PlatformPay.PaymentType.Immediate
                        }
                    ]
                }
            }
        );
        if (error) {
            setError(error)
            Toast.show(error.message)
            return
        }
        // complete payment
        setPaymentProcessing(true)
        const props: ICompletePurchaseProps = {
            paymentIntentId: paymentIntent.id,
            amount: amount,
            paymentOption: 'apple pay'
        }
        const response = await completeCoinPurchase(props)
        if (response && response.error) {
            Toast.show(response.error)
            return
        }
        navigation.navigate('Home', { screen: 'Profile' })
    }

    useEffect(() => {
        initializePaymentSheet();
        (async function () {
            setIsApplePaySupported(await isPlatformPaySupported());
        })();
    }, [isPlatformPaySupported])

    return (
        <StyledView className="w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-col items-center p-4 h-2/4">
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
            {/* <StyledText className="text-white">{JSON.stringify(error)}</StyledText> */}
            <StyledView className="flex w-full mt-6 p-4">
                {
                    isApplePaySupported ?
                        (
                            // <PlatformPayButton
                            //     onPress={pay}
                            //     type={PlatformPay.ButtonType.Order}
                            //     appearance={PlatformPay.ButtonStyle.Black}
                            //     borderRadius={4}
                            //     style={{
                            //         width: '100%',
                            //         height: 50,
                            //         borderRadius: 16
                            //     }}
                            // />
                            <></>
                        )
                        :
                        <StyledTouchableOpacity className="w-full bg-white/10 p-4 mt-6 rounded-lg flex items-center justify-center" onPress={openPaymentSheet}>
                            <StyledText className="text-white text-lg font-bold">Proceed to pay</StyledText>
                        </StyledTouchableOpacity>
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