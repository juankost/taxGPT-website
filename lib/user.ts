import { Tokens } from 'next-firebase-auth-edge'
import { User } from '../app/auth/AuthContext'
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'
import { type DefaultSession } from 'next-auth'
import { IdTokenResult, User as FirebaseUser } from 'firebase/auth'

interface Session {
  user: {
    id: string
    sub: string
  } & DefaultSession['user']
}

export const toAuthTime = (date: string): number => {
  return new Date(date).getTime() / 1000
}

export const toUserFromCredentials = (
  user: FirebaseUser,
  idTokenResult: IdTokenResult
): User => {
  return {
    ...user,
    emailVerified:
      user.emailVerified || (idTokenResult.claims.email_verified as boolean),
    customClaims: filterStandardClaims(idTokenResult.claims),
    authTime: toAuthTime(idTokenResult.issuedAtTime)
  }
}

export const toUserFromToken = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    auth_time: authTime,
    source_sign_in_provider: signInProvider
  } = decodedToken

  const customClaims = filterStandardClaims(decodedToken)

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
    authTime
  }
}

export const toSession = ({ decodedToken }: Tokens): Session => {
  const { user_id: id, sub, name, picture, email, uid } = decodedToken

  return {
    user: {
      id,
      sub,
      name,
      email,
      image: picture
    }
  }
}
