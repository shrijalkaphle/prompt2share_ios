import { REQUEST_TYPE } from "../../enum/http.enum"

export interface IHttpClient {
    makeRequest<T, R>(parameters: IHttpClientRequestParameters<R>): Promise<T>
}

export interface IHttpClientRequestParameters<R> {
    endPoint: string
    type: REQUEST_TYPE
    requiresToken: boolean
    cancelToken?: any
    payload?: R
}