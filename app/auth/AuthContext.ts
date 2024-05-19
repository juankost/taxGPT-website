import { createContext, useContext } from 'react'
import { UserInfo } from 'firebase/auth'
import { Claims } from 'next-firebase-auth-edge/lib/auth/claims'

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
