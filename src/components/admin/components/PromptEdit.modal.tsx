import { Modal } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { Formik } from "formik"
import { useState } from "react"
import { InputField } from "../../core/InputField"
import * as Yup from 'yup';
import { updatePrompt } from "../../../services/admin.service"
import Toast from "react-native-root-toast"

interface PromptEdit {
    prompt_id: string
    name: string
}

const WithdrawUpdateFormSchema =  Yup.object().shape({
    prompt_id: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
});

export const PromptEditModal = ({modelState, setModelState, prompt, setPrompt} : any) => {
    const init = {
        "prompt_id": prompt.id,
        "name": prompt.name,
    }
    const [initialValue, setInitialValue] = useState<PromptEdit>(init)

    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)

    const updateWithdrawRequest = async (value: PromptEdit) => {
        setFormSubmitting(true)
        const response = await updatePrompt(value)
        if (response && response.error) {
            setFormSubmitting(false)
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)
        setPrompt(response.prompt)
        setModelState(false)
        setFormSubmitting(false)
    }

    return (
        <Modal visible={modelState} animationType="slide" onRequestClose={() => setModelState(false)} presentationStyle="formSheet">
            <StyledView className="bg-background w-full h-full flex items-center p-4">
            <StyledView className="w-full p-4 bg-background rounded-lg">
                    <StyledView className="flex flex-row items-center justify-between">
                        <StyledText className="text-white font-bold text-lg">Edit Prompt</StyledText>
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
                                        placeholder="Prompt"
                                        error={`${errors.name && touched.name ? errors.name : ""}`}
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