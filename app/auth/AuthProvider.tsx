'use client'
import * as React from 'react'
import { AuthContext, User } from './AuthContext'

export interface AuthProviderProps {
  serverUser: User | null
  children: React.ReactNode
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  serverUser,
  children
}) => {
  const [user, setUser] = React.useState(serverUser)

  // Synchronize server side user with client side user
  React.useEffect(() => {
    if (user === serverUser) {
      return
    }

    setUser(serverUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
