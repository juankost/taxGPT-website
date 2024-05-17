'use client'
import * as React from 'react'
import {
  IdTokenResult,
  onIdTokenChanged,
  User as FirebaseUser
} from 'firebase/auth'
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'
import { AuthContext, User, getAuthenticationStatus } from './AuthContext'
import { getFirebaseAuth } from './firebase'
import { login, logout } from '@/app/auth'
import { toAuthTime, toUserFromCredentials } from '@/lib/user'
import { refreshToken } from '@/app/auth'

export interface AuthProviderProps {
  serverUser: User | null
  children: React.ReactNode
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  serverUser,
  children
}) => {
  const [user, setUser] = React.useState(serverUser)

  // Update based on the authentication status
  React.useEffect(() => {
    const verifyAuth = async () => {
      setUser(await getAuthenticationStatus())
    }

    verifyAuth()
    const interval = setInterval(verifyAuth, 300000) // Re-check every 5 minutes
    return () => clearInterval(interval)
  }, [])

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
