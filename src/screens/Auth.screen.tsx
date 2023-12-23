import { useState } from "react"
import { StyledActivityIndicator, StyledSafeAreaView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { useAuth } from "../contexts/AuthContext"
import { Keyboard } from 'react-native'
import Toast from 'react-native-root-toast'
import { StatusBar } from "expo-status-bar"

export const AuthScreen = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const { onLogin, onRegister } = useAuth()

    const verifyLogin = async () => {
        Keyboard.dismiss()
        setFormLoading(true)
        const response = await onLogin!({email, password})
        if(response && response.error) {
            Toast.show(response.message)
        }
        setFormLoading(false)
    }
    
    return (
        <StyledView className="flex justify-center items-center bg-background w-full h-full">
            <StatusBar style="light" animated={true} />
            <StyledSafeAreaView className="flex h-4/5 w-4/5 items-center justify-center gap-10">
                <StyledText className="font-bold text-2xl text-gray-400">Sign in to Prompt to Share</StyledText>
                <StyledView className="w-full">
                    <StyledView className="w-full">
                        <StyledText className="text-gray-400">Enter your email</StyledText>
                        <StyledTextInput
                            className='my-2.5 border rounded px-2.5 py-2 bg-transparent text-gray-400 border-gray-400'
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete='email'
                            value={email}
                            onChange={(e) => setEmail(e.nativeEvent.text)}
                        />
                    </StyledView>

                    <StyledView className="w-full">
                        <StyledText className="text-gray-400">Enter your password</StyledText>
                        <StyledTextInput
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            className='my-2.5 border rounded px-2.5 py-2 bg-transparent text-gray-400 border-gray-400'
                            value={password}
                            onChange={(e) => setPassword(e.nativeEvent.text)}
                        />
                    </StyledView>

                    <StyledView className="w-full mt-8">
                        <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white active:bg-primary active:text-gray-400 rounded-lg" onPress={verifyLogin} disabled={formLoading}>
                            <StyledText className="flex items-center justify-center gap-x-6">
                                Login
                                {
                                    formLoading && <StyledText > <StyledActivityIndicator className="h-4 w-4" /> </StyledText>
                                }
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    {/* <StyledView className="w-full mt-8">
                        <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-transparent border border-gray-400 rounded-lg" onPress={() => navigation.navigate('ForgotPassword')}>
                            <StyledText className='text-gray-400'>Forgot Password?</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView> */}

                    {/* <StyledText className='text-gray-400 mt-12 text-sm'>Don't have an Account? <StyledText className="text-semibold text-primary" onPress={() => navigation.navigate('Register')}>Sign Up</StyledText> </StyledText> */}
                </StyledView>
            </StyledSafeAreaView>
        </StyledView>
    )
}