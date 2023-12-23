import { IUser } from "../models.type"
import { ILoginParams, IRegisterParams } from "../services/auth.type"

export interface IAuthContext {
    authUser?: IUser | undefined
    authState?: IAuthState
    onRegister?:(registerParams: IRegisterParams) => Promise<any>
    onLogin?: (loginParams: ILoginParams) => Promise<any>
    onLogout?: () => Promise<any>
    setAuthUser?: (authUser: IUser | undefined) => void
}

export interface IAuthState {
    token: string | null
    authenticated: boolean | null
}