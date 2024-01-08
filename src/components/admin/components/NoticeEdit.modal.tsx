import { Modal } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { Formik } from "formik"
import { useState } from "react"
import { InputField } from "../../core/InputField"
import * as Yup from 'yup';
import { updateNotice } from "../../../services/admin.service"
import Toast from "react-native-root-toast"
import AutoGrowingTextInput from "react-native-autogrow-textinput-ts"

interface NoticeEdit {
    notice_id: string
    name: string
}

const WithdrawUpdateFormSchema = Yup.object().shape({
    notice_id: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
});

export const NoticeEditModal = ({ modelState, setModelState, notice, setNotice }: any) => {
    const init = {
        "notice_id": notice.id,
        "name": notice.name,
    }
    const [initialValue, setInitialValue] = useState<NoticeEdit>(init)

    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)

    const updateWithdrawRequest = async (value: NoticeEdit) => {
        setFormSubmitting(true)
        const response = await updateNotice(value)
        if (response && response.error) {
            setFormSubmitting(false)
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)
        setNotice(response.notice)
        setModelState(false)
        setFormSubmitting(false)
    }

    return (
        <Modal visible={modelState} animationType="slide" onRequestClose={() => setModelState(false)} presentationStyle="formSheet">
            <StyledView className="bg-background w-full h-full flex items-center p-4">
                <StyledView className="w-full p-4 bg-background rounded-lg">
                    <StyledView className="flex flex-row items-center justify-between">
                        <StyledText className="text-white font-bold text-lg">Edit Notice</StyledText>
                        <StyledTouchableOpacity onPress={() => setModelState(false)}>
                            <Ionicons name="close" size={24} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className="mt-8">
                        <Formik initialValues={initialValue} onSubmit={updateWithdrawRequest} enableReinitialize={true} validationSchema={WithdrawUpdateFormSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <StyledView>
                                    <StyledView className={`w-full rounded-xl ${errors.name && touched.name ? 'bg-red-200' : 'bg-white/10'} h-fit p-4`}>
                                        <AutoGrowingTextInput placeholder={'Write a post'} style={{ color: 'white', textAlignVertical: 'top' }}
                                            minHeight={50} maxHeight={50} placeholderTextColor={errors.name && touched.name ? 'red' : 'white'} value={values.name}
                                            onChangeText={handleChange('name')} onBlur={handleBlur('name')} /></StyledView>

                                    <StyledView className="flex items-center justify-center mt-2">

                                        <StyledTouchableOpacity onPress={() => handleSubmit()} className="border border-slate-300 rounded-lg px-4 py-3 w-fit mt-3" >
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