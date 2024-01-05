import { Modal, Platform } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { useRef, useState } from "react"
import { withdrawRequest } from "../../services/payment.service"
import Toast from "react-native-root-toast"
import { Formik } from "formik"
import { InputField } from "./InputField"
import { IWithdrawRequestProps } from "../../types/services/payment.type"
import { WithdrawFormSchema } from "../../schema/Withdraw.schema"


export const WithdrawModal = ({ modelState, setModelState, availableAmount }: any) => {

    const initialWithdrawValue = {
        bankName: '',
        routingNumber: '',
        accountNumber: '',
        name: '',
        amount: ''
    }
    const [initialValue, setInitialValue] = useState<IWithdrawRequestProps>(initialWithdrawValue)

    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)

    const requestWithdraw = async (value: IWithdrawRequestProps) => {
        setFormSubmitting(true)
        const reponse = await withdrawRequest(value)
        if (reponse && reponse.error) {
            Toast.show(reponse.error)
            setFormSubmitting(false)
            return
        }

        setFormSubmitting(false)
        Toast.show(reponse.message)
        setModelState(false)
        setInitialValue(initialWithdrawValue)
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
                        <Formik initialValues={initialValue} onSubmit={requestWithdraw} enableReinitialize={true} validationSchema={WithdrawFormSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <StyledView>
                                    <InputField
                                        value={values.bankName}
                                        handleChange={handleChange('bankName')}
                                        handleBlur={handleBlur('bankName')}
                                        placeholder="Bank Name"
                                        error={`${errors.bankName && touched.bankName ? errors.bankName : ""}`}
                                        secureText={false} />
                                    <InputField
                                        value={values.routingNumber}
                                        handleChange={handleChange('routingNumber')}
                                        handleBlur={handleBlur('routingNumber')}
                                        placeholder="Routing Number"
                                        error={`${errors.routingNumber && touched.routingNumber ? errors.routingNumber : ""}`}
                                        secureText={false} />
                                    <InputField
                                        value={values.name}
                                        handleChange={handleChange('name')}
                                        handleBlur={handleBlur('name')}
                                        placeholder="Account Name"
                                        error={`${errors.name && touched.name ? errors.name : ""}`}
                                        secureText={false} />
                                    <InputField
                                        value={values.accountNumber}
                                        handleChange={handleChange('accountNumber')}
                                        handleBlur={handleBlur('accountNumber')}
                                        placeholder="Account Number"
                                        error={`${errors.accountNumber && touched.accountNumber ? errors.accountNumber : ""}`}
                                        secureText={false} />
                                    <InputField
                                        value={values.amount}
                                        handleChange={handleChange('amount')}
                                        handleBlur={handleBlur('amount')}
                                        placeholder="Amount"
                                        error={`${errors.amount && touched.amount ? errors.amount : ""}`}
                                        secureText={false} />
                                    <StyledView className="flex items-center justify-center mt-2">
                                        <StyledText className="text-white text-lg font-bold">Available amount for withdraw: ${availableAmount}</StyledText>
                                        <StyledTouchableOpacity onPress={()=>handleSubmit()} className="border border-slate-300 rounded-lg px-4 py-3 w-fit mt-3" >
                                            {availableAmount < 25 ?
                                                <StyledText className="text-white font-bold">Atleast $25 required for withdraw</StyledText>
                                                :
                                                <StyledText className="text-white font-bold">{formSumbitting ? <StyledActivityIndicator /> : 'Request'}</StyledText>
                                            }

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