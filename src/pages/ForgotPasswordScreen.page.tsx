import { useState } from "react";
import { StyledSafeAreaView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView, StyledCheckbox } from '../helpers/NativeWind.helper'


export const ForgotPasswordScreenPage = ({ navigation }: any) => {
    
    const [email, setEmail] = useState<string>('')

    const updatePassword = (e: string) => {

    }


    return (
        <StyledView className="flex justify-center items-center bg-background w-full h-full">
            <StyledSafeAreaView className="flex h-4/5 w-4/5 items-center justify-center gap-10">
                <StyledText className="font-bold text-2xl text-gray-400">Forgit Password?</StyledText>
                <StyledView className="w-full">

                    <StyledView className="w-full">
                        <StyledText className="text-gray-400">Enter your email</StyledText>
                        <StyledTextInput
                            className='my-2.5 border rounded px-2.5 py-2 bg-transparent text-gray-400 border-gray-400'
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete='email'
                        />
                    </StyledView>

                    <StyledView className="w-full mt-8">
                        <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white active:bg-primary active:text-gray-400 rounded-lg" onPress={() => { }}>
                            <StyledText>Next</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledText className='text-gray-400 mt-12 text-sm'>Remember Password? <StyledText className="text-semibold text-primary" onPress={() => navigation.navigate('Login')}>Sign In</StyledText> </StyledText>
                </StyledView>
            </StyledSafeAreaView>
        </StyledView>
    )
}