import { Formik } from "formik"
import { StyledActivityIndicator, StyledSafeAreaView, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { InputField } from "../core/InputField"
import { IPasswordChangeParams, IVerifAccountParams, IVerifyPasswordResetParams } from "../../types/services/auth.type"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { ForgotPasswordFormSchema, ForgotPasswordOTPSchema, UpdatePasswordOTPSchema } from "../../schema/Forgotpassword.schema"
import { updateForgotPassword, verifyAccountExists, verifyPasswordResetOTP } from "../../services/auth.service"
import { Keyboard } from "react-native"
import Toast from "react-native-root-toast"

export const ForgotPasswordForm = ({ setAuthType }:any) => {

    const defaultValue: IVerifAccountParams = {
        email: ''
    }
    const [initialValue, setInitialValue] = useState<IVerifAccountParams>(defaultValue)

    const [formLoading, setFormLoading] = useState<boolean>(false)
    const { onLogin } = useAuth()
    const [userId, setUserId] = useState<string>()

    const [showOTP, setShowOTP] = useState<boolean>(false)
    const [showPasswordChange, setShowPasswordChange] = useState<boolean>(false)
    const [otpFormik, setOTPFormik] = useState<IVerifyPasswordResetParams>({
        email: '',
        otp: ''
    })
    const [passwordChangeFormik, setPasswordChangeFormik] = useState<IPasswordChangeParams>({
        password: '',
        confirm_password: '',
        user_id: ''
    })

    const verifyEmail = async (value: IVerifAccountParams) => {
        Keyboard.dismiss()
        setFormLoading(true)
        const response = await verifyAccountExists(value)
        if (response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red'
            })
            setFormLoading(false)
            return
        }
        setFormLoading(false)
        setShowOTP(true)
    }

    const verifyOTP = async (value: IVerifyPasswordResetParams) => {
        Keyboard.dismiss()
        setFormLoading(true)
        const params = {
            otp: value.otp,
            email: value.email
        }
        const response = await verifyPasswordResetOTP(params)
        if (response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red'
            })
            setFormLoading(false)
            return
        }
        setShowPasswordChange(true)
        setUserId(response.user.user_id)
        setFormLoading(false)
    }

    const updatePassword = async (value: IPasswordChangeParams) => {
        Keyboard.dismiss()
        setFormLoading(true)
        const params = {
            user_id: userId ? userId : '',
            password: value.password,
            confirm_password: value.confirm_password
        }

        const response = await updateForgotPassword(params)
        if(response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red'
            })
            setFormLoading(true)
            return
        }
        setFormLoading(false)
        setShowOTP(false)
        setShowPasswordChange(false)
        setAuthType('login')
        Toast.show(response.message)
    }

    return (
        <StyledSafeAreaView className={`w-4/5 items-center flex`}>
            {
                !showPasswordChange ?
                    <>
                        {
                            !showOTP ?
                                <>
                                    <StyledText className="font-bold text-2xl text-gray-400 my-10">Find my account</StyledText>
                                    <StyledView className="w-full">
                                        <Formik initialValues={initialValue} onSubmit={verifyEmail} validationSchema={ForgotPasswordFormSchema}>
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
                                                    <StyledView className="w-full mt-6 flex items-center justify-center">
                                                        <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white/10 w-full rounded-lg" onPress={() => handleSubmit()} disabled={formLoading}>
                                                            {
                                                                formLoading ? <StyledActivityIndicator className="h-4 w-4" /> : <StyledText className="flex items-center justify-center text-white"> Continue </StyledText>
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
                                        <Formik initialValues={otpFormik} onSubmit={verifyOTP} validationSchema={ForgotPasswordOTPSchema}>
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
                    </>
                    :
                    <>
                        <StyledText className="font-bold text-2xl text-gray-400 my-10">Update your password</StyledText>
                        <StyledView className="w-full">
                            <Formik initialValues={passwordChangeFormik} onSubmit={updatePassword} validationSchema={UpdatePasswordOTPSchema}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <StyledView>
                                        <InputField
                                            value={values.password}
                                            handleChange={handleChange('password')}
                                            handleBlur={handleBlur('password')}
                                            placeholder="Enter your password"
                                            error={`${errors.password && touched.password ? errors.password : ""}`}
                                            secureText={true}
                                        />
                                        <InputField
                                            value={values.confirm_password}
                                            handleChange={handleChange('confirm_password')}
                                            handleBlur={handleBlur('confirm_password')}
                                            placeholder="Confirm password"
                                            error={`${errors.confirm_password && touched.confirm_password ? errors.confirm_password : ""}`}
                                            secureText={true}
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
        </StyledSafeAreaView>
    )
}