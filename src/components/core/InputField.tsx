import { Keyboard, KeyboardTypeOptions, NativeSyntheticEvent, Platform, TextInputFocusEventData } from "react-native"
import { StyledText, StyledTextInput, StyledView } from "../../helpers/NativeWind.helper"

interface IInputField {
    value: string,
    handleChange: ((text: string) => void) | undefined,
    handleBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined
    placeholder: string
    error: string
    secureText?: boolean
    maxLength?: number
    keyboardType?: KeyboardTypeOptions
}

export const InputField = ({value, handleChange, handleBlur, placeholder, error, secureText, maxLength, keyboardType}:IInputField) => {
    return (
        <StyledView className="my-1">
            <StyledTextInput
                className={`rounded-lg px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'} ${error ? 'bg-red-200 text-red-500' : 'text-white bg-white/10'}`}
                onChangeText={handleChange}
                onBlur={handleBlur}
                value={value}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor={error ? 'red' : 'white'}
                secureTextEntry={secureText}
                maxLength={maxLength}
                keyboardType={keyboardType}
            />
            <StyledText className="text-red-500 text-xs ml-2">{error ? error : ''}</StyledText>
        </StyledView>
    )
}