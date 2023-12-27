import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext, IAuthState } from "../types/contexts/AuthContext.type";
import { ILoginParams, IRegisterParams, IVerifyRegisterParams } from "../types/services/auth.type";
import { ENDPOINT } from "../enum/endpoint.enum";
import { IUser } from "../types/models.type";

const TOKEN_KEY = 'token'
const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = createContext<IAuthContext>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<IAuthState>({ token: null, authenticated: null })
    const [authUser, setAuthUser] = useState<IUser | undefined>(undefined)

    const updateAuthUser = async () => {
        console.log('update user')
        const response = await axios.get(`${API_ENDPOINT}/${ENDPOINT.ME}`)
        setAuthUser(response.data)
    }

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            if (token) {
                setAuthState({ token, authenticated: true })
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                axios.defaults.headers.common['Content-Type'] = 'application/json'
                updateAuthUser()
            }
        }
        loadToken()
    }, [])

    const login = async (loginParams: ILoginParams) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/${ENDPOINT.LOGIN}`, loginParams)
            if (response.data.access_token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
                await SecureStore.setItemAsync(TOKEN_KEY, response.data.access_token)
                setAuthState({ token: response.data.access_token, authenticated: true })
                updateAuthUser()
            }
        } catch (error) {
            return { error: true, message: (error as any).response.data.message }
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        setAuthState({ token: null, authenticated: false })
        axios.defaults.headers.common['Authorization'] = ''
        setAuthUser(undefined)
    }

    const register = async (registerParams: IRegisterParams) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/${ENDPOINT.REGISTER}`, registerParams)
            return response.data
        } catch (error) {
            return { error: true, message: (error as any).response.data.message }
        }
    }

    const verifyOTP = async (verifyRegisterParams: IVerifyRegisterParams) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/${ENDPOINT.VERIFY_REGISTER}`, verifyRegisterParams)
            if (response.data.access_token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
                await SecureStore.setItemAsync(TOKEN_KEY, response.data.access_token)
                setAuthState({ token: response.data.access_token, authenticated: true })
                updateAuthUser()
            }
            return response.data
        } catch (error) {
            return { error: true, message: (error as any).response.data.message }
        }
    }
    const value = {
        authUser: authUser,
        authState: authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        setAuthUser: setAuthUser,
        onRegisterVerify: verifyOTP
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}