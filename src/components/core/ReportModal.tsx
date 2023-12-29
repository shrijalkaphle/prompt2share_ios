import { Modal } from "react-native"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { Formik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'
import { FORM_ERRORS } from "../../enum/form.enum"
import AutoGrowingTextInput from "react-native-autogrow-textinput-ts"
import { IReportPostProps } from "../../types/services/post.type"
import { reportPostForProblem } from "../../services/post.service"
import Toast from "react-native-root-toast"

export const ReportModal = ({ modelState, setModelState, postId }: any) => {

    const initialValue = {
        postId: postId,
        reason: '',
    }

    const validationSchema = Yup.object().shape({
        postId: Yup.string().required(FORM_ERRORS.REQUIRED),
        reason: Yup.string().required(FORM_ERRORS.REQUIRED),
    })

    const [initialFormikValues, setInitialFormikValues] = useState<IReportPostProps>(initialValue)

    const [reportingProblem, setReportingProblem] = useState<boolean>(false)

    const reportProblem = async (values: IReportPostProps) => {
        setReportingProblem(true)
        const response = await reportPostForProblem(values)
        if(response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            setReportingProblem(false)
            return
        }
        Toast.show(response.message)
        setModelState(false)
        setInitialFormikValues(initialValue)
    }

    return (
        <Modal
            visible={modelState}
            animationType="slide"
            presentationStyle="formSheet">
            <StyledView className="h-full flex items-center bg-background p-4">
                <StyledView className="w-full flex items-end justify-end mt-4">
                    <StyledTouchableOpacity onPress={() => setModelState(false)}>
                        <Ionicons name="close" size={24} color="white" />
                    </StyledTouchableOpacity>
                </StyledView>
                <StyledView className="w-full flex items-center justify-center mt-3">
                    <StyledText className="text-white font-bold text-lg">Report Post</StyledText>
                    <StyledText className="text-white">We are trying out best to make P2S better.</StyledText>

                    <Formik initialValues={initialFormikValues} onSubmit={reportProblem} validationSchema={validationSchema}>
                        {({ handleSubmit, values, errors, handleBlur, touched, handleChange }) => (
                            <StyledView className="w-full mt-4">
                                <StyledView className={`w-full rounded-xl ${errors.reason && touched.reason ? 'bg-red-200' : 'bg-white/10'} h-fit p-4`}>
                                    <AutoGrowingTextInput placeholder={'Write a reason'} style={{ color: 'white', textAlignVertical: 'top' }}
                                        minHeight={50} maxHeight={50} placeholderTextColor={errors.reason && touched.reason ? 'red' : 'white'} value={values.reason}
                                        onChangeText={handleChange('reason')} onBlur={handleBlur('reason')} />
                                </StyledView>
                                <StyledText className="text-red-500 text-xs ml-2">{errors.reason && touched.reason ? errors.reason : ''}</StyledText>

                                <StyledView className="mt-4">
                                    <StyledTouchableOpacity onPress={() => handleSubmit()} className="w-full px-4 py-3 rounded-full flex items-center justify-center bg-white/10">
                                        {
                                            reportingProblem ? <StyledActivityIndicator /> : <StyledText className="text-white my-0.5">Report</StyledText>
                                        }
                                    </StyledTouchableOpacity>
                                </StyledView>
                            </StyledView>
                        )}

                    </Formik>
                </StyledView>
            </StyledView>
        </Modal>
    )
}