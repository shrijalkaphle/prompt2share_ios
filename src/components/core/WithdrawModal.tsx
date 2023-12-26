import { Modal, Platform } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { useRef, useState } from "react"
import { withdrawRequest } from "../../services/payment.service"
import Toast from "react-native-root-toast"

export const WithdrawModal = ({ modelState, setModelState, availableAmount }: any) => {

    const [bankName, setBankName] = useState<string>('')
    const [routingNumber, setRoutingNumber] = useState<string>('')
    const [accountNumber, setAccountNumber] = useState<string>('')
    const [accountName, setAccountName] = useState<string>('')
    const [amount, setAmount] = useState<string>('')

    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)

    const bankNameRef = useRef<any>(null)
    const routingNumberRef = useRef<any>(null)
    const accountNumberRef = useRef<any>(null)
    const accountNameRef = useRef<any>(null)
    const amountRef = useRef<any>(null)

    const requestWithdraw = async () => {
        setFormSubmitting(true)
        const props = {
            bankName: bankName,
            routingNumber: routingNumber,
            accountNumber: accountNumber,
            name: accountName,
            amount: amount
        }

        const reponse = await withdrawRequest(props)
        if(reponse && reponse.error) {
            Toast.show(reponse.error)
            setFormSubmitting(false)
            return
        }
        
        setFormSubmitting(false)
        Toast.show(reponse.message)
        setModelState(false)
        setAmount('')
        setBankName('')
        setRoutingNumber('')
        setAccountNumber('')
        setAccountName('')
    }


    return (
        <Modal visible={modelState} animationType="slide" onRequestClose={() => setModelState(false)} presentationStyle="formSheet">
            <StyledView className="bg-background w-full h-full flex items-center p-4">
                <StyledView className="w-full p-4 bg-background rounded-lg">
                    <StyledView className="flex flex-row items-center justify-between">
                        <StyledText className="text-white font-bold text-lg">Withdraw</StyledText>
                        <StyledTouchableOpacity onPress={() => setModelState(false)}>
                            <Ionicons name="close" size={24} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className="mt-8">
                        <StyledTextInput className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                            placeholder="Bank Name" placeholderTextColor={'white'} value={bankName} ref={bankNameRef}
                            onChangeText={setBankName} returnKeyType="next" onSubmitEditing={() => { routingNumberRef.current.focus(); }} blurOnSubmit={false}/>
                        <StyledTextInput className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                            placeholder="Routing Number" placeholderTextColor={'white'} value={routingNumber} ref={routingNumberRef} keyboardType={Platform.OS === 'ios' ? 'default' : 'numeric'}
                            onChangeText={setRoutingNumber} returnKeyType="next" onSubmitEditing={() => { accountNameRef.current.focus(); }} blurOnSubmit={false}/>
                        <StyledTextInput className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                            placeholder="Account Name" placeholderTextColor={'white'} value={accountName} ref={accountNameRef}
                            onChangeText={setAccountName} returnKeyType="next" onSubmitEditing={() => { accountNumberRef.current.focus(); }} blurOnSubmit={false}/>
                        <StyledTextInput className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                            placeholder="Account Number" placeholderTextColor={'white'} value={accountNumber} ref={accountNumberRef} 
                            onChangeText={setAccountNumber} returnKeyType="next" onSubmitEditing={() => { amountRef.current.focus(); }} blurOnSubmit={false}/>
                        <StyledTextInput className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`} keyboardType={Platform.OS === 'ios' ? 'default' : 'numeric'}
                            placeholder="Amount" placeholderTextColor={'white'} value={amount} ref={amountRef}
                            onChangeText={setAmount} returnKeyType="default"/>
                        <StyledView className="flex items-center justify-center mt-2">
                            <StyledText className="text-white text-lg font-bold">Available amount for withdraw: ${availableAmount}</StyledText>
                            <StyledTouchableOpacity onPress={requestWithdraw} className="border border-slate-300 rounded-lg px-4 py-3 w-fit mt-3" disabled={availableAmount < 25 || formSumbitting}>
                            {availableAmount < 25 ? 
                                <StyledText className="text-white font-bold">Atleast $25 required for withdraw</StyledText> 
                                : 
                                <StyledText className="text-white font-bold">{formSumbitting ? <StyledActivityIndicator/> : 'Request'}</StyledText>
                            }
                                
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledView>
        </Modal>
    )
}