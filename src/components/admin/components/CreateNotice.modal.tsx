import { Modal } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { Formik } from "formik"
import { useState } from "react"
import { InputField } from "../../core/InputField"
import * as Yup from 'yup';
import { createNotice } from "../../../services/admin.service"
import Toast from "react-native-root-toast"

interface CreatePrompt {
    name: string
}

const WithdrawUpdateFormSchema =  Yup.object().shape({
    name: Yup.string().required('Required'),
});

export const CreateNoticeModal = ({modelState, setModelState, setNotices, notices} : any) => {
    const init = {
        "name": '',
    }
    const [initialValue, setInitialValue] = useState<CreatePrompt>(init)

    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)

    const updateWithdrawRequest = async (value: CreatePrompt) => {
        setFormSubmitting(true)
        const response = await createNotice(value)
        if (response && response.error) {
            setFormSubmitting(false)
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)
        setNotices([response.notice, ...notices])
        setModelState(false)
        setFormSubmitting(false)
    }

    return (
        <Modal visible={modelState} animationType="slide" onRequestClose={() => setModelState(false)} presentationStyle="formSheet">
            <StyledView className="bg-background w-full h-full flex items-center p-4">
            <StyledView className="w-full p-4 bg-background rounded-lg">
                    <StyledView className="flex flex-row items-center justify-between">
                        <StyledText className="text-white font-bold text-lg">Create Notice</StyledText>
                        <StyledTouchableOpacity onPress={() => setModelState(false)}>
                            <Ionicons name="close" size={24} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className="mt-8">
                        <Formik initialValues={initialValue} onSubmit={updateWithdrawRequest} enableReinitialize={true} validationSchema={WithdrawUpdateFormSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <StyledView>
                                    <InputField
                                        value={values.name}
                                        handleChange={handleChange('name')}
                                        handleBlur={handleBlur('name')}
                                        placeholder="Notice"
                                        error={`${errors.name && touched.name ? errors.name : ""}`}
                                        secureText={false} />
                                    <StyledView className="flex items-center justify-center mt-2">
                                        
                                        <StyledTouchableOpacity onPress={()=>handleSubmit()} className="border border-slate-300 rounded-lg px-4 py-3 w-fit mt-3" >
                                            <StyledText className="text-white font-bold">{formSumbitting ? <StyledActivityIndicator /> : 'Create'}</StyledText>
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