import { Keyboard, Modal, Platform } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { useRef, useState } from "react"
import { withdrawRequest } from "../../services/payment.service"
import Toast from "react-native-root-toast"
import AutoGrowingTextInput from "react-native-autogrow-textinput-ts"
import { Formik } from "formik"
import { WithdrawFormSchema } from "../../schema/Withdraw.schema"
import { InputField } from "./InputField"
import { ReportFormSchema } from "../../schema/Report.schema"
import { reportProblem } from "../../services/user.service"
import { IReportProblem } from "../../types/services/user.type"

export const ReportProblemModel = ({ modelState, setModelState }: any) => {

    const initialFormikValue = {
        title: '',
        message: ''
    }

    const [initialValue, setInitialValue] = useState<IReportProblem>(initialFormikValue)

    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)

    const requestWithdraw = async (value: IReportProblem) => {
        Keyboard.dismiss()
        setFormSubmitting(true)
        const response = await reportProblem(value)
        console.log(response)
        if(response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red'
            })

            setFormSubmitting(false)
            return
        }
        setModelState(false)
        setInitialValue(initialFormikValue)
    }


    return (
        <Modal visible={modelState} animationType="slide" onRequestClose={() => setModelState(false)} presentationStyle="formSheet">
            <StyledView className="bg-background w-full h-full flex items-center p-4">
                <StyledView className="w-full p-4 bg-background rounded-lg">
                    <StyledView className="flex flex-row items-center justify-between">
                        <StyledText className="text-white font-bold text-lg">Report Problem</StyledText>
                        <StyledTouchableOpacity onPress={() => setModelState(false)}>
                            <Ionicons name="close" size={24} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className="mt-8">
                        <Formik initialValues={initialValue} onSubmit={requestWithdraw} enableReinitialize={true} validationSchema={ReportFormSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <StyledView>
                                    <InputField
                                        value={values.title}
                                        handleChange={handleChange('title')}
                                        handleBlur={handleBlur('title')}
                                        placeholder="Title"
                                        error={`${errors.title && touched.title ? errors.title : ""}`}
                                        secureText={false} />

                                    <StyledView className={`w-full rounded-xl h-fit p-4 ${errors.message && touched.message ? 'bg-red-200' : 'bg-white/10'}`}>
                                        <AutoGrowingTextInput placeholder={'Message'} style={{ color: 'white', textAlignVertical: 'top' }} 
                                            minHeight={50} maxHeight={80} placeholderTextColor={errors.message && touched.message ? 'red' : 'white'} value={values.message} 
                                            onChangeText={handleChange('message')} onBlur={handleBlur('message')}/>
                                    </StyledView>
                                    <StyledText className="text-red-500 text-xs ml-2">{errors.message && touched.message ? errors.message : ''}</StyledText>
                                    <StyledView className="flex items-center justify-center mt-2">
                                        <StyledTouchableOpacity onPress={() => handleSubmit()} className="border border-slate-300 rounded-lg px-4 py-3 w-fit mt-3" disabled={formSumbitting}>
                                            <StyledText className="text-white font-bold">{formSumbitting ? <StyledActivityIndicator /> : 'Report'}</StyledText>
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