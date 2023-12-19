import { inject, injectable } from "tsyringe";
import { IHttpClient, IHttpClientRequestParameters } from "../types/helpers/IHttpClient.type";
import { ITokenHelper } from "../types/helpers/IToken.helper";
import { TokenHelper } from "./Token.helper";
import axios, { AxiosRequestConfig } from "axios";
import { API_ENDPOINT } from '@env';
import { REQUEST_TYPE } from "../enum/http.enum";

@injectable()
export class HttpClient implements IHttpClient {
    tokenHelper: ITokenHelper
    // toastHelper: any

    constructor(@inject(TokenHelper) tokenHelper: ITokenHelper) {
        this.tokenHelper = tokenHelper
    }

    makeRequest<T, R>(parameters: IHttpClientRequestParameters<R>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { endPoint, type, payload, requiresToken } = parameters
            const options: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            if (requiresToken) {
                const token = this.getToken();
                options.headers!.Authorization = "Bearer " + token;
            }

            const api_url = API_ENDPOINT;

            if (payload && type != REQUEST_TYPE.GET) {
                axios[type](api_url + endPoint, payload, options)
                    .then((response: any) => {
                        resolve(response.data as T)
                    })
                    .catch((response: any) => {
                        // this.toastHelper.showError(response.response.data.message);

                        reject(response)
                    })
            }
            else if (payload && type == REQUEST_TYPE.GET) {
                axios.get(api_url + endPoint, {
                    headers: options.headers,
                    params: payload
                })
                    .then((response: any) => {
                        resolve(response.data as T)
                    })
                    .catch((response: any) => {
                        // this.toastHelper.showError(response.response.data.message);

                        reject(response)
                    })
            }
            else {
                axios[type](api_url + endPoint, options)
                    .then((response: any) => {
                        resolve(response.data as T)
                    })
                    .catch((response: any) => {
                        // this.toastHelper.showError(response.response.data.message);

                        reject(response)
                    })
            }
        })
    }

    getToken(): string | null {
        return this.tokenHelper.getToken();
    }
}