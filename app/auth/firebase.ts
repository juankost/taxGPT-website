import { getApp, getApps, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { clientConfig } from '../../config/client-config'
import { getOrInitializeAppCheck } from './AppCheck'

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
