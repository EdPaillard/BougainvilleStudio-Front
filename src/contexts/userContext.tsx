import React, { FC, ReactElement, createContext, useContext, useState } from 'react'

type UserProviderProps = {
    children: ReactElement | ReactElement[] | React.ReactNode
}

type UserParams = {
    pseudo: string
    id: string
    email: string
    token: string
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserContextProvider");
    }
    return context;
  }

export type UserContextProps = {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    userParams: UserParams,
    setUserParams: (user: UserParams) => void
}

export const UserContext = createContext<UserContextProps | null>(null);

const UserProvider:FC<UserProviderProps> = ({ children }) => {
    const [userParams, setUserParams] = useState<UserParams>({
        pseudo: '',
        id: '',
        email: '', 
        token: ''
    })
    const [isLogged, setIsLogged] = useState(false)

    const value: UserContextProps = {
        isLogged,
        setIsLogged,
        userParams,
        setUserParams
    }

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider