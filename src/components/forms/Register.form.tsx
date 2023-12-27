import { Keyboard } from "react-native"
import { StyledActivityIndicator, StyledSafeAreaView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useState } from "react"
import { Formik } from "formik"
import { useAuth } from "../../contexts/AuthContext"
import { IRegisterParams, IVerifyRegisterParams } from "../../types/services/auth.type"
import Toast from "react-native-root-toast"
import { LoginFormSchema } from "../../schema/Login.schema"
import { InputField } from "../core/InputField"
import { RegisterFormSchema, RegisterOTPSchema } from "../../schema/Register.schema"

export const RegisterForm = () => {

    const defaultValue: IRegisterParams = {
        email: '',
        password: '',
        name: '',
        confirm_password: ''
    }
    const [initialValue, setInitialValue] = useState<IRegisterParams>(defaultValue)

    const [formLoading, setFormLoading] = useState<boolean>(false)
    const { onRegister, onRegisterVerify } = useAuth()

    const [showOTP, setShowOTP] = useState<boolean>(false)
    const [otpFormik, setOTPFormik] = useState<IVerifyRegisterParams>({
        email: '',
        otp: ''
    })

    const verifyRegister = async (value: IRegisterParams) => {
        Keyboard.dismiss()
        setFormLoading(true)
        const response = await onRegister!(value)
        if (response && response.error) {
            Toast.show(response.message)
        }
        setOTPFormik({ email: value.email, otp: '' })
        setShowOTP(true)
        setFormLoading(false)
    }

    const verifyOTP = async (value: IVerifyRegisterParams) => {
        Keyboard.dismiss()
        setFormLoading(true)
        const params = {
            otp: value.otp,
            email: value.email
        }
        const response = await onRegisterVerify!(params)
        setFormLoading(false)
    }



    return (
        <StyledSafeAreaView className={`w-4/5 items-center flex`}>

            {
                !showOTP ?
                    <>
                        <StyledText className="font-bold text-2xl text-gray-400 my-10">Register to Prompt to Share</StyledText>
                        <StyledView className="w-full">
                            <Formik initialValues={initialValue} onSubmit={verifyRegister} validationSchema={RegisterFormSchema}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <StyledView>
                                        <InputField
                                            value={values.name}
                                            handleChange={handleChange('name')}
                                            handleBlur={handleBlur('name')}
                                            placeholder="Enter your name"
                                            error={`${errors.name && touched.name ? errors.name : ""}`}
                                            secureText={false}
                                        />
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
                                        <InputField
                                            value={values.password}
                                            handleChange={handleChange('confirm_password')}
                                            handleBlur={handleBlur('confirm_password')}
                                            placeholder="Confirm password"
                                            error={`${errors.password && touched.confirm_password ? errors.confirm_password : ""}`}
                                            secureText={true}
                                        />
                                        <StyledView className="w-full mt-6 flex items-center justify-center">
                                            <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white/10 w-full rounded-lg" onPress={() => handleSubmit()} disabled={formLoading}>
                                                {
                                                    formLoading ? <StyledActivityIndicator className="h-4 w-4" /> : <StyledText className="flex items-center justify-center text-white"> Register </StyledText>
                                                }
                                            </StyledTouchableOpacity>
                                        </StyledView>
                                    </StyledView>

                                )}
                            </Formik>
                        </StyledView>
                    </>

                    :
                    <>
                        <StyledText className="font-bold text-2xl text-gray-400 my-10">Verify your email</StyledText>
                        <StyledView className="w-full">
                            <Formik initialValues={otpFormik} onSubmit={verifyOTP} validationSchema={RegisterOTPSchema}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <StyledView>
                                        <InputField
                                            value={values.otp}
                                            handleChange={handleChange('otp')}
                                            handleBlur={handleBlur('otp')}
                                            placeholder="Enter your OTP"
                                            error={`${errors.otp && touched.otp ? errors.otp : ""}`}
                                            secureText={false}
                                            maxLength={6}
                                            keyboardType={'numeric'}
                                        />
                                        <StyledView className="w-full mt-6 flex items-center justify-center">
                                            <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white/10 w-full rounded-lg" onPress={() => handleSubmit()} disabled={formLoading}>
                                                {
                                                    formLoading ? <StyledActivityIndicator className="h-4 w-4" /> : <StyledText className="flex items-center justify-center text-white"> Verify </StyledText>
                                                }
                                            </StyledTouchableOpacity>
                                        </StyledView>
                                    </StyledView>

                                )}
                            </Formik>
                        </StyledView>
                    </>
            }
        </StyledSafeAreaView >
    )
}