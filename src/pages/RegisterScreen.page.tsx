import { useState } from "react";
import { StyledSafeAreaView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView, StyledCheckbox } from '../helpers/NativeWind.helper'


export const RegisterScreenPage = ({ navigation }: any) => {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    })
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const updatePassword = (e: string) => {

    }

    const setChecked = () => {
        setIsChecked(!isChecked)
    }

    return (
        <StyledView className="flex justify-center items-center bg-background w-full h-full">
            <StyledSafeAreaView className="flex h-4/5 w-4/5 items-center justify-center gap-10">
                <StyledText className="font-bold text-2xl text-gray-400">Register to Prompt to Share</StyledText>
                <StyledView className="w-full">
                    <StyledView className="w-full">
                        <StyledText className="text-gray-400">Enter your name</StyledText>
                        <StyledTextInput
                            className='my-2.5 border rounded px-2.5 py-2 bg-transparent text-gray-400 border-gray-400'
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </StyledView>

                    <StyledView className="w-full">
                        <StyledText className="text-gray-400">Enter your email</StyledText>
                        <StyledTextInput
                            className='my-2.5 border rounded px-2.5 py-2 bg-transparent text-gray-400 border-gray-400'
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete='email'
                        />
                    </StyledView>

                    <StyledView className="w-full">
                        <StyledText className="text-gray-400">Enter your password</StyledText>
                        <StyledTextInput
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            className='my-2.5 border rounded px-2.5 py-2 bg-transparent text-gray-400 border-gray-400'
                        />
                    </StyledView>

                    <StyledView className="w-full">
                        <StyledText className="text-gray-400">Re-enter your password</StyledText>
                        <StyledTextInput
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            className='my-2.5 border rounded px-2.5 py-2 bg-transparent text-gray-400 border-gray-400'
                        />
                    </StyledView>

                    <StyledView className="w-full flex items-center flex-row gap-x-4">
                        <StyledCheckbox value={isChecked} onValueChange={setChecked} color={isChecked ? "#0FFFE2" : undefined} className="inline"/>
                        <StyledText className="text-gray-400">I agree to the <StyledText className="text-primary">Terms and Conditions</StyledText></StyledText>
                    </StyledView>

                    <StyledView className="w-full mt-8">
                        <StyledTouchableOpacity className="flex items-center justify-center py-4 bg-white active:bg-primary active:text-gray-400 rounded-lg" onPress={() => { }}>
                            <StyledText>Sign up</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledText className='text-gray-400 mt-12 text-sm'>Already have an Account? <StyledText className="text-semibold text-primary" onPress={() => navigation.navigate('Login')}>Sign In</StyledText> </StyledText>
                </StyledView>
            </StyledSafeAreaView>
        </StyledView>
    )
}