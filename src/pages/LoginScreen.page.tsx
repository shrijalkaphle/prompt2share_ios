import { useContext, useEffect, useState } from "react";
import { StyledSafeAreaView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView, StyledActivityIndicator } from '../helpers/NativeWind.helper'
import { login } from '../services/auth.service'
import { UserContext } from "../contexts/UserContext";
import { IAuthResponse } from "../types/services/auth.type";
import { AUTH_CONSTANTS } from "../enum/auth.enum";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginScreenPage = ({ navigation }: any) => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [formLoading, setFormLoading] = useState<boolean>(false)

    const verifyLogin = () => {
        setFormLoading(true)
        login({email, password}).then((response: IAuthResponse) => {
            setUser(response.user)
            navigation.navigate('Home',{ screen: 'HomeScreen' })
        })
    }

    const validateUser = async () => {
        const _token = await AsyncStorage.getItem(AUTH_CONSTANTS.TOKENKEY)
        if(_token) {
            navigation.navigate('Home',{ screen: 'HomeScreen' })
        }
    }
    useEffect(() => {
        validateUser()
    },[])

    return (
        <StyledView className="flex justify-center items-center bg-background w-full h-full">
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
                                    formLoading && <StyledText > <StyledActivityIndicator className="h-4 w-4"/> </StyledText>
                                }
                            </StyledText> 
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledView className="w-full mt-8">
                        <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-transparent border border-gray-400 rounded-lg" onPress={() => navigation.navigate('ForgotPassword')}>
                            <StyledText className='text-gray-400'>Forgot Password?</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledText className='text-gray-400 mt-12 text-sm'>Don't have an Account? <StyledText className="text-semibold text-primary" onPress={() => navigation.navigate('Register')}>Sign Up</StyledText> </StyledText>
                </StyledView>
            </StyledSafeAreaView>
        </StyledView>
    )
}