export interface ITokenHelper {
    tokenExists(): Promise<boolean>
    setToken(token: string): Promise<boolean>
    getToken() : Promise<string | null>
    removeToken() : void
}