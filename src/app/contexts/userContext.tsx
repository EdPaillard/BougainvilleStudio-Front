"use client"
import React, { FC, ReactElement, createContext, useState } from 'react'

type UserProviderProps = {
    children: ReactElement | ReactElement[] | React.ReactNode
}

type UserParams = {
    userName: string
    email: string
}

export interface UserContextProps {
    isLogged: boolean
    userParams: UserParams,
    setIsLogged: (isLogged: boolean) => void
    setUserParams: (user: UserParams) => void
}

export let UserContext = createContext<UserContextProps | null>(null);

const UserProvider:FC<UserProviderProps> = ({ children }) => {
    const [userParams, setUserParams] = useState<UserParams>({
        userName: '',
        email: ''
    })
    const [isLogged, setIsLogged] = useState(false)

    const value: UserContextProps = {
        isLogged,
        userParams,
        setIsLogged,
        setUserParams
    }

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider