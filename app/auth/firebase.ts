import { getApp, getApps, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { clientConfig } from '../../config/client-config'
import { getOrInitializeAppCheck } from './AppCheck'
import type { Auth, AuthError, AuthProvider, User } from 'firebase/auth'
import {
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  useDeviceLanguage,
  UserCredential
} from 'firebase/auth'

// Initializing the Firebase app
export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp()
  }

  const app = initializeApp(clientConfig)

  if (process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY) {
    getOrInitializeAppCheck(app)
  }

  return app
}

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseApp())
  return auth
}

// Setting up Authentication Providers from Firebase app
const CREDENTIAL_ALREADY_IN_USE_ERROR = 'auth/credential-already-in-use'
export const isCredentialAlreadyInUseError = (e: AuthError) =>
  e?.code === CREDENTIAL_ALREADY_IN_USE_ERROR

export const logout = async (auth: Auth): Promise<void> => {
  return signOut(auth)
}

export const getGoogleProvider = (auth: Auth) => {
  const provider = new GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useDeviceLanguage(auth)
  provider.setCustomParameters({
    display: 'popup'
  })
  return provider
}

export const loginWithProvider = async (
  auth: Auth,
  provider: AuthProvider
): Promise<UserCredential> => {
  const result = await signInWithPopup(
    auth,
    provider,
    browserPopupRedirectResolver
  )

  return result
}
