import { useState } from "react"
import { StyledActivityIndicator, StyledSafeAreaView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { useAuth } from "../contexts/AuthContext"
import { Keyboard, Platform } from 'react-native'
import Toast from 'react-native-root-toast'
import { StatusBar } from "expo-status-bar"

export const AuthScreen = () => {

    const [email, setEmail] = useState<string>("shrijal006@gmail.com")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [otp, setOTP] = useState<string>("")

    const [showOTP, setShowOTP] = useState<boolean>(false)

    const [formLoading, setFormLoading] = useState<boolean>(false)
    const { onLogin, onRegister, onVerifyOTP } = useAuth()

    const [authType, setAuthType] = useState<'login' | 'register' | 'forgot-password'>('register')

    const verifyLogin = async () => {
        Keyboard.dismiss()
        setFormLoading(true)
        const response = await onLogin!({ email, password })
        if (response && response.error) {
            Toast.show(response.message)
        }
        setFormLoading(false)
    }

    const verifyRegister = async () => {
        Keyboard.dismiss()
        setFormLoading(true)
        const response = await onRegister!({ email: email, password: password, name: name, confirm_password: confirmPassword })
        if (response && response.error) {
            Toast.show(response.message)
            setFormLoading(false)
            return
        }
        setFormLoading(false)
    }

    const verifyOTP = async () => {
        Keyboard.dismiss()
        setFormLoading(true)
        const response = await onVerifyOTP!({ email, otp })
        if (response && response.error) {
            Toast.show(response.message)
            setFormLoading(false)
            return
        }
        setFormLoading(false)
        setShowOTP(false)
    }

    const resentOTP = async () => {
        
    }

    return (
        <StyledView className="flex justify-center items-center bg-background w-full h-full">
            <StatusBar style="light" animated={true} />
            {
                showOTP ?
                    <StyledSafeAreaView className={`h-4/5 w-4/5 items-center flex`}>
                        <StyledText className="font-bold text-2xl text-gray-400 mt-10">Enter OTP</StyledText>
                        <StyledTextInput
                            className={`text-white bg-white/10 rounded-lg my-3 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'} w-full`}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Enter OTP"
                            placeholderTextColor={'white'}
                            value={otp}
                            onChange={(e) => setOTP(e.nativeEvent.text)}
                            keyboardType="number-pad"
                        />
                        <StyledView className="flex items-start justify-center my-3 w-full">
                            <StyledText className="text-white">OTP has been sent to <StyledText className="font-bold">{`${email.split('@')[0].substring(0,4)}****@${email.split('@')[1]}`}</StyledText></StyledText>
                        </StyledView>
                        <StyledView className="flex items-end justify-end mb-3 w-full">
                            <StyledText className="text-white">Didn't receive OTP? <StyledText className="text-primary" onPress={resentOTP}>Send again</StyledText></StyledText>
                        </StyledView>
                        <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white/10 w-full rounded-2xl" onPress={verifyOTP}>
                            {
                                formLoading ? <StyledActivityIndicator className="h-4 w-4" /> : <StyledText className="flex items-center justify-center text-white"> Verify </StyledText>
                            }
                        </StyledTouchableOpacity>
                    </StyledSafeAreaView>
                    :
                    <>
                        <StyledSafeAreaView className={`flex h-4/5 w-4/5 items-center ${authType == 'login' ? 'flex' : 'hidden'}`}>
                            <StyledText className="font-bold text-2xl text-gray-400 my-10">Sign in to Prompt to Share</StyledText>
                            <StyledView className="w-full">
                                <StyledView className="w-full">
                                    <StyledTextInput
                                        className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete='email'
                                        placeholder="Enter your email"
                                        placeholderTextColor={'white'}
                                        value={email}
                                        onChange={(e) => setEmail(e.nativeEvent.text)}
                                    />
                                </StyledView>

                                <StyledView className="w-full">
                                    <StyledTextInput
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                                        placeholder="Enter your password"
                                        placeholderTextColor={'white'}
                                        value={password}
                                        onChange={(e) => setPassword(e.nativeEvent.text)}
                                    />
                                </StyledView>

                                <StyledView className="w-full mt-6 flex items-center justify-center">
                                    <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white/10 w-full rounded-lg" onPress={verifyLogin} disabled={formLoading}>
                                        {
                                            formLoading ? <StyledActivityIndicator className="h-4 w-4" /> : <StyledText className="flex items-center justify-center text-white"> Login </StyledText>
                                        }
                                    </StyledTouchableOpacity>
                                    <StyledText className="flex items-center justify-center text-white mt-6" onPress={() => setAuthType('forgot-password')}> Forgot Password? </StyledText>
                                    <StyledText className="flex items-center justify-center text-white mt-2"> Dont have an account? <StyledText className="text-primary font-bold" onPress={() => setAuthType('register')}> Register </StyledText> </StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledSafeAreaView>

                        <StyledSafeAreaView className={`flex h-4/5 w-4/5 items-center ${authType == 'register' ? 'flex' : 'hidden'}`}>
                            <StyledText className="font-bold text-2xl text-gray-400 my-10">Register to Prompt to Share</StyledText>
                            <StyledView className="w-full">
                                <StyledView className="w-full">
                                    <StyledTextInput
                                        className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete='name'
                                        placeholder="Enter your name"
                                        placeholderTextColor={'white'}
                                        value={name}
                                        onChange={(e) => setName(e.nativeEvent.text)}
                                    />
                                    <StyledTextInput
                                        className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete='email'
                                        placeholder="Enter your email"
                                        placeholderTextColor={'white'}
                                        value={email}
                                        onChange={(e) => setEmail(e.nativeEvent.text)}
                                    />
                                    <StyledTextInput
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                                        placeholder="Enter your password"
                                        placeholderTextColor={'white'}
                                        value={password}
                                        onChange={(e) => setPassword(e.nativeEvent.text)}
                                    />
                                    <StyledTextInput
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                                        placeholder="Confirm password"
                                        placeholderTextColor={'white'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                                    />
                                </StyledView>


                                <StyledView className="w-full mt-6 flex items-center justify-center">
                                    <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white/10 w-full rounded-lg" onPress={verifyRegister} disabled={formLoading}>
                                        {
                                            formLoading ? <StyledActivityIndicator className="h-4 w-4" /> : <StyledText className="flex items-center justify-center text-white"> Register </StyledText>
                                        }
                                    </StyledTouchableOpacity>
                                    <StyledText className="flex items-center justify-center text-white mt-6" onPress={() => setAuthType('forgot-password')}> Forgot Password? </StyledText>
                                    <StyledText className="flex items-center justify-center text-white mt-2"> Already have an account? <StyledText className="text-primary font-bold" onPress={() => setAuthType('login')}> Login </StyledText> </StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledSafeAreaView>
                    </>
            }
        </StyledView>
    )
}