import { Modal } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { Formik } from "formik"
import { useState } from "react"
import { InputField } from "../../core/InputField"
import * as Yup from 'yup';
import { updateWithdrawStatus } from "../../../services/admin.service"
import Toast from "react-native-root-toast"

interface WithdrawRequestUpdate {
    withdraw_id: string
    sender_account: string
    sender_receipt: string
}

const WithdrawUpdateFormSchema =  Yup.object().shape({
    sender_account: Yup.string().required('Required'),
    sender_receipt: Yup.string().required('Required'),
    withdraw_id: Yup.string().required('Required')
});

export const WithdrawEditModal = ({modelState, setModelState, withdrawId, setWithdraw} : any) => {
    const init = {
        "withdraw_id": withdrawId,
        "sender_account": '',
        "sender_receipt": ''
    }
    const [initialValue, setInitialValue] = useState<WithdrawRequestUpdate>(init)

    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)

    const updateWithdrawRequest = async (value: WithdrawRequestUpdate) => {
        setFormSubmitting(true)
        const response = await updateWithdrawStatus(value)
        if (response && response.error) {
            setFormSubmitting(false)
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)
        setWithdraw(response.withdraw)
        setInitialValue(init)
        setModelState(false)
        setFormSubmitting(false)
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
                        <Formik initialValues={initialValue} onSubmit={updateWithdrawRequest} enableReinitialize={true} validationSchema={WithdrawUpdateFormSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <StyledView>
                                    <InputField
                                        value={values.sender_account}
                                        handleChange={handleChange('sender_account')}
                                        handleBlur={handleBlur('sender_account')}
                                        placeholder="Sender Account"
                                        error={`${errors.sender_account && touched.sender_account ? errors.sender_account : ""}`}
                                        secureText={false} />
                                    <InputField
                                        value={values.sender_receipt}
                                        handleChange={handleChange('sender_receipt')}
                                        handleBlur={handleBlur('sender_receipt')}
                                        placeholder="Sender Recipt"
                                        error={`${errors.sender_receipt && touched.sender_receipt ? errors.sender_receipt : ""}`}
                                        secureText={false} />
                                    <StyledView className="flex items-center justify-center mt-2">
                                        
                                        <StyledTouchableOpacity onPress={()=>handleSubmit()} className="border border-slate-300 rounded-lg px-4 py-3 w-fit mt-3" >
                                            <StyledText className="text-white font-bold">{formSumbitting ? <StyledActivityIndicator /> : 'Update'}</StyledText>
                                        </StyledTouchableOpacity>
                                    </StyledView>
                                </StyledView>

                            )}
                        </Formik>
                    </StyledView>
                </StyledView>
            </StyledView>
        </Modal>
    )
}