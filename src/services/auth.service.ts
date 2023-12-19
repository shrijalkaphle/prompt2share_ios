import { IAuthResponse, ILoginParams, IUserResponse } from "../types/services/auth.type";
import { ENDPOINT } from "../enum/endpoint.enum";
import { REQUEST_TYPE } from "../enum/http.enum";
import axios, { AxiosRequestConfig } from "axios";
import Toast from 'react-native-root-toast'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_CONSTANTS } from "../enum/auth.enum";

const api_url = process.env.EXPO_PUBLIC_API_URL;
export const login = (loginParams: ILoginParams) => {
    return new Promise<IAuthResponse>((resolve, reject) => {
        const endPoint = ENDPOINT.LOGIN;
        const type = REQUEST_TYPE.POST;
        const payload: ILoginParams = loginParams
        const options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        // api request
        axios[type](api_url + endPoint, payload, options)
            .then(async (response: any) => {
                // STORE AUTH TOKEN
                if(response.data.access_token){
                    await AsyncStorage.setItem(AUTH_CONSTANTS.TOKENKEY, response.data.access_token)
                    resolve(response.data as IAuthResponse)
                } else {
                    Toast.show(response.data.message)
                    resolve(response.data as IAuthResponse)
                }
            })
            .catch((response: any) => {
                Toast.show('Invalid credentials!')
                reject(response)
            })

    })
}


export const me = () => {
    return new Promise<IUserResponse>(async (resolve, reject) => {
        const endPoint = ENDPOINT.ME;
        const type = REQUEST_TYPE.GET;
        const options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem(AUTH_CONSTANTS.TOKENKEY)
            }
        }

        // api request
        axios[type](api_url + endPoint, options)
            .then(async (response: any) => {
                // STORE AUTH TOKEN
                resolve(response.data as IUserResponse)
            })
            .catch((response: any) => {
                Toast.show('Error in calling API')
                reject(response)
            })

    })
}