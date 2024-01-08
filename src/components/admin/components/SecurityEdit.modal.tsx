import { Keyboard, Modal } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import { InputField } from "../../core/InputField"
import * as Yup from 'yup';
import { updateSecurity } from "../../../services/admin.service"
import Toast from "react-native-root-toast"
import { ISecurity } from "../../../types/models.type"

const WithdrawUpdateFormSchema =  Yup.object().shape({
    profile_rating: Yup.string().required('Required'),
    problem_report: Yup.string().required('Required'),
    post: Yup.string().required('Required'),
    generate: Yup.string().required('Required'),
});

export const SecurityEditModal = ({modelState, setModelState, setSecurity, security} : any) => {

    const [initialValue, setInitialValue] = useState<ISecurity>(security)
    const [formSumbitting, setFormSubmitting] = useState<boolean>(false)
    const updateSecurityDetail = async (value: ISecurity) => {
        value.id = security.id
        setFormSubmitting(true)
        const response = await updateSecurity(value)
        if (response && response.error) {
            setFormSubmitting(false)
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)
        setSecurity(response.security)
        setModelState(false)
        setFormSubmitting(false)
    }
    return (
        <Modal visible={modelState} animationType="slide" onRequestClose={() => setModelState(false)} presentationStyle="formSheet">
            <StyledView className="bg-background w-full h-full flex items-center p-4" onTouchStart={() => Keyboard.dismiss()}>
            <StyledView className="w-full p-4 bg-background rounded-lg">
                    <StyledView className="flex flex-row items-center justify-between">
                        <StyledText className="text-white font-bold text-lg">Edit Security</StyledText>
                        <StyledTouchableOpacity onPress={() => setModelState(false)}>
                            <Ionicons name="close" size={24} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className="mt-8">
                        <Formik initialValues={initialValue} onSubmit={updateSecurityDetail} enableReinitialize={true} validationSchema={WithdrawUpdateFormSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <StyledView>
                                    <StyledText className="text-white">Profile Rating Limit</StyledText>
                                    <InputField
                                        value={values.profile_rating}
                                        handleChange={handleChange('profile_rating')}
                                        handleBlur={handleBlur('profile_rating')}
                                        placeholder="Profile Rating Limit"
                                        error={`${errors.profile_rating && touched.profile_rating ? errors.profile_rating : ""}`}
                                        keyboardType="numeric"
                                        secureText={false} />
                                    <StyledText className="text-white">Problem Report Limit</StyledText>
                                    <InputField
                                        value={values.problem_report}
                                        handleChange={handleChange('problem_report')}
                                        handleBlur={handleBlur('problem_report')}
                                        placeholder="Problem Report Limit"
                                        error={`${errors.problem_report && touched.problem_report ? errors.problem_report : ""}`}
                                        keyboardType="numeric"
                                        secureText={false} />
                                    <StyledText className="text-white">Post Limit</StyledText>
                                    <InputField
                                        value={values.post}
                                        handleChange={handleChange('post')}
                                        handleBlur={handleBlur('post')}
                                        placeholder="Post Limit"
                                        error={`${errors.post && touched.post ? errors.post : ""}`}
                                        keyboardType="numeric"
                                        secureText={false} />
                                    <StyledText className="text-white">Generate Limit</StyledText>
                                    <InputField
                                        value={values.generate}
                                        handleChange={handleChange('generate')}
                                        handleBlur={handleBlur('generate')}
                                        placeholder="Generate Limit"
                                        error={`${errors.generate && touched.generate ? errors.generate : ""}`}
                                        keyboardType="numeric"
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