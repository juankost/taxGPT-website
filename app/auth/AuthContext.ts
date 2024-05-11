// 'use client'
import { createContext, useContext } from 'react'
import { UserInfo } from 'firebase/auth'
import { Claims } from 'next-firebase-auth-edge/lib/auth/claims'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/server-config'
import { toUser as toUserData } from '@/lib/user'

export interface User extends UserInfo {
  emailVerified: boolean
  customClaims: Claims
  authTime: number
}

export interface AuthContextValue {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {} // Placeholder function, will be replaced by the actual function in the provider
})

export const useAuth = () => useContext(AuthContext)

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
