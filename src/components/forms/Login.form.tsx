import { Keyboard, Platform } from "react-native"
import { StyledActivityIndicator, StyledSafeAreaView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useState } from "react"
import { Formik } from "formik"
import { useAuth } from "../../contexts/AuthContext"
import { ILoginParams } from "../../types/services/auth.type"
import Toast from "react-native-root-toast"
import { LoginFormSchema } from "../../schema/Login.schema"
import { InputField } from "../core/InputField"

export const LoginForm = () => {

    const defaultValue: ILoginParams = {
        email: '',
        password: ''
    }
    const [initialValue, setInitialValue] = useState<ILoginParams>(defaultValue)

    const [formLoading, setFormLoading] = useState<boolean>(false)
    const { onLogin } = useAuth()

    const verifyLogin = async (value: ILoginParams) => {
        Keyboard.dismiss()
        setFormLoading(true)
        const response = await onLogin!(value)
        if (response && response.error) {
            Toast.show(response.message)
        }
        setFormLoading(false)
        setInitialValue(defaultValue)
    }



    return (
        <StyledSafeAreaView className={`w-4/5 items-center flex`}>
            <StyledText className="font-bold text-2xl text-gray-400 my-10">Sign in to Prompt to Share</StyledText>
            <StyledView className="w-full">
                <Formik initialValues={initialValue} onSubmit={verifyLogin} validationSchema={LoginFormSchema}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <StyledView>
                            <InputField
                                value={values.email}
                                handleChange={handleChange('email')}
                                handleBlur={handleBlur('email')}
                                placeholder="Enter your email"
                                error={`${errors.email && touched.email ? errors.email : ""}`}
                                secureText={false}
                            />
                            <InputField
                                value={values.password}
                                handleChange={handleChange('password')}
                                handleBlur={handleBlur('password')}
                                placeholder="Enter your password"
                                error={`${errors.password && touched.password ? errors.password : ""}`}
                                secureText={true}
                            />
                            <StyledView className="w-full mt-6 flex items-center justify-center">
                                <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white/10 w-full rounded-lg" onPress={() => handleSubmit()} disabled={formLoading}>
                                    {
                                        formLoading ? <StyledActivityIndicator className="h-4 w-4" /> : <StyledText className="flex items-center justify-center text-white"> Login </StyledText>
                                    }
                                </StyledTouchableOpacity>
                            </StyledView>
                        </StyledView>

                    )}
                </Formik>
            </StyledView>
        </StyledSafeAreaView>
    )
}