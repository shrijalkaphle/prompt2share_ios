import { useState } from "react"
import { StyledText, StyledView } from "../helpers/NativeWind.helper"
import { StatusBar } from "expo-status-bar"
import { LoginForm } from "../components/forms/Login.form"
import { RegisterForm } from "../components/forms/Register.form"
import { ForgotPasswordForm } from "../components/forms/ForgotPassword.form"

export const AuthScreen = () => {

    const [authType, setAuthType] = useState<'login' | 'register' | 'forgot-password'>('login')


    return (
        <StyledView className="flex justify-center items-center bg-background w-full h-full">
            <StatusBar style="light"/>
            {
                authType == 'login' &&
                <StyledView className={`h-4/5 w-full items-center flex`}>
                    <LoginForm />
                    <StyledText className="flex items-center justify-center text-white mt-6" onPress={() => setAuthType('forgot-password')}> Forgot Password? </StyledText>
                    <StyledText className="flex items-center justify-center text-white mt-2"> Don't have an account? <StyledText className="text-primary font-bold" onPress={() => setAuthType('register')}> Register </StyledText> </StyledText>
                </StyledView>
            }
            {
                authType == 'register' &&
                <StyledView className={`h-4/5 w-full items-center flex`}>
                    <RegisterForm />
                    <StyledText className="flex items-center justify-center text-white mt-6"> Already have an account? <StyledText className="text-primary font-bold" onPress={() => setAuthType('login')}> Login </StyledText> </StyledText>
                </StyledView>
            }
            {
                authType == 'forgot-password' &&
                <StyledView className={`h-4/5 w-full items-center flex`}>
                    <ForgotPasswordForm setAuthType={setAuthType}/>
                    <StyledText className="flex items-center justify-center text-white mt-6"> Know your password? <StyledText className="text-primary font-bold" onPress={() => setAuthType('login')}> Login </StyledText> </StyledText>
                </StyledView>
            }
        </StyledView>
    )
}