'use client'

import * as React from 'react'
import {
  IdTokenResult,
  onIdTokenChanged,
  User as FirebaseUser
} from 'firebase/auth'
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'
import { AuthContext, User } from './AuthContext'
import { getFirebaseAuth } from './firebase'
import { login, logout } from '@/app/auth'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/server-config'
import { toUser as toUserData } from '@/lib/user'

export interface AuthProviderProps {
  serverUser: User | null
  children: React.ReactNode
}

function toUser(user: FirebaseUser, idTokenResult: IdTokenResult): User {
  return {
    ...user,
    emailVerified:
      user.emailVerified || (idTokenResult.claims.email_verified as boolean),
    customClaims: filterStandardClaims(idTokenResult.claims),
    authTime: toAuthTime(idTokenResult.issuedAtTime)
  }
}

function toAuthTime(date: string) {
  return new Date(date).getTime() / 1000
}

export const getAuthenticationStatus = async () => {
  try {
    const authToken = await getTokens(cookies(), authConfig)
    if (authToken) {
      return toUserData(authToken)
    }
  } catch (error) {
    console.error('Authentication status check failed:', error)
  }
  return null
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

  const handleLogout = async () => {
    if (!user) {
      return
    }

    await logout()
    setUser(null)
    window.location.reload()
  }

  const handleLogin = async (firebaseUser: FirebaseUser) => {
    const idTokenResult = await firebaseUser.getIdTokenResult()

    if (
      user?.authTime &&
      user.authTime >= toAuthTime(idTokenResult.issuedAtTime)
    ) {
      return
    }

    await login(idTokenResult.token)
    setUser(toUser(firebaseUser, idTokenResult))
  }

  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      await handleLogout()
      return
    }

    await handleLogin(firebaseUser)
  }

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return onIdTokenChanged(getFirebaseAuth(), handleIdTokenChanged)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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
