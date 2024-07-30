import { Keyboard } from "react-native"
import { StyledActivityIndicator, StyledSafeAreaView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useEffect, useState } from "react"
import { Formik } from "formik"
import { useAuth } from "../../contexts/AuthContext"
import { ILoginParams, IProviderLoginProps } from "../../types/services/auth.type"
import Toast from "react-native-root-toast"
import { LoginFormSchema } from "../../schema/Login.schema"
import { InputField } from "../core/InputField"
import { Ionicons } from "@expo/vector-icons"
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"
import { createTokenWithCode, getUserEmailandName } from "../../utils/github.utils"
import * as AppleAuthentication from 'expo-apple-authentication';

import { StyleSheet } from 'react-native';


WebBrowser.maybeCompleteAuthSession();

// endpoints
const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
}

export const LoginForm = () => {

    const defaultValue: ILoginParams = {
        email: '',
        password: ''
    }

    const [request, response, promptAsync] = useAuthRequest({
        clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
        scopes: ['read:user'],
        redirectUri: makeRedirectUri(),
    }, discovery)

    const [initialValue, setInitialValue] = useState<ILoginParams>(defaultValue)

    const [formLoading, setFormLoading] = useState<boolean>(false)
    const { onLogin, onProviderLogin } = useAuth()

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

    const redirectToGithub = async () => {
        promptAsync({ windowName: "Prompt to Share" })
    }

    const handleResponse = async () => {
        if (response?.type === 'success') {
            const { code } = response.params
            const stuff = await createTokenWithCode(code)
            if (!stuff.email) {
                Toast.show('Set your github email to public to login with github');
                return
            }

            setFormLoading(true)
            const props: IProviderLoginProps = {
                provider: 'github',
                provider_id: code,
                name: stuff.name || '',
                email: stuff.email
            }
            onProviderLogin!(props)
        } else {
            console.log('no', response)
        }
    }

    useEffect(() => {
        handleResponse()
    }, [response])



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
                                <StyledTouchableOpacity className={`flex items-center justify-center py-4 w-full rounded-lg ${formLoading ? 'bg-neutral-500' : 'bg-white/10'} `} onPress={() => handleSubmit()} disabled={formLoading}>
                                    <StyledText className="flex items-center justify-center text-white"> Login </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                        </StyledView>
                    )}
                </Formik>

                <StyledTouchableOpacity className={`flex flex-row items-center justify-center py-4 w-full rounded-lg mt-6 ${formLoading ? 'bg-[#333]/50' : 'bg-[#333]'} `} onPress={redirectToGithub} disabled={formLoading}>
                    <Ionicons name={'logo-github'} size={22} color={'white'} />
                    <StyledText className="flex items-center justify-center text-white"> Login with GitHub </StyledText>
                </StyledTouchableOpacity>
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={styles.button}
                    onPress={async () => {
                        try {
                            const credential = await AppleAuthentication.signInAsync({
                                requestedScopes: [
                                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                ],
                            });

                            const { fullName, email, identityToken } = credential

                            if (!email) {
                                Toast.show('Email is required to login with apple');
                                return
                            }

                            setFormLoading(true)
                            const props: IProviderLoginProps = {
                                provider: 'apple',
                                provider_id: identityToken as string,
                                name: `${fullName?.givenName} ${fullName?.familyName}` || '',
                                email: email
                            }

                            onProviderLogin!(props)

                            // signed in
                        } catch (e: any) {
                            if (e.code === 'ERR_REQUEST_CANCELED') {
                                // handle that the user canceled the sign-in flow
                            } else {
                                // handle other errors
                            }
                        }
                    }}
                />
            </StyledView>
        </StyledSafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        height: 44,
    },
});