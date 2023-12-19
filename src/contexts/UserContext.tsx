import { createContext } from 'react'
import { IUser } from '../types/models.type'

interface IUserContext {
    user: IUser | undefined
    setUser: (user: IUser | undefined) => void
}

export const UserContext = createContext<IUserContext>({
    user: undefined,
    setUser: () => {},
});