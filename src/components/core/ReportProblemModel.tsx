import { Modal, Platform } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { useRef, useState } from "react"
import { withdrawRequest } from "../../services/payment.service"
import Toast from "react-native-root-toast"
import AutoGrowingTextInput from "react-native-autogrow-textinput-ts"

export const ReportProblemModel = ({ modelState, setModelState }: any) => {

    const [title, setTitle] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)

    const titleRef = useRef<any>(null)
    const messageRef = useRef<any>(null)

    const requestWithdraw = async () => {
        setFormSubmitting(true)
        const props = {
            title: title,
            message: message
        }

        // const reponse = await withdrawRequest(props)
        // if(reponse && reponse.error) {
        //     Toast.show(reponse.error)
        //     setFormSubmitting(false)
        //     return
        // }

        // setFormSubmitting(false)
        // Toast.show(reponse.message)
        setModelState(false)
        setTitle('')
        setMessage('')
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
                            placeholder="Title" placeholderTextColor={'white'} value={title} ref={titleRef}
                            onChangeText={setTitle} returnKeyType="next" onSubmitEditing={() => { messageRef.current.focus(); }} blurOnSubmit={false} />
                            <StyledView className="w-full rounded-xl bg-white/10 h-fit p-4 ">
                            <AutoGrowingTextInput placeholder={'Message'} style={{ color: 'white', textAlignVertical: 'top' }} minHeight={50} maxHeight={80} placeholderTextColor={'white'} value={message} onChange={(e) => setMessage(e.nativeEvent.text)} />
                        </StyledView>
                        
                        
                        {/* <StyledTextInput className="text-white border border-slate-300 rounded-lg my-2 px-2 py-2"
                            placeholder="Routing Number" placeholderTextColor={'white'} value={message} ref={messageRef}
                            onChangeText={setMessage} returnKeyType="default" /> */}

                        <StyledView className="flex items-center justify-center mt-2">
                            <StyledTouchableOpacity onPress={requestWithdraw} className="border border-slate-300 rounded-lg px-4 py-3 w-fit mt-3" disabled={formSumbitting}>
                                <StyledText className="text-white font-bold">{formSumbitting ? <StyledActivityIndicator /> : 'Request'}</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledView>
        </Modal>
    )
}