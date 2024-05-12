'use client'

import * as React from 'react'
import { useLoadingCallback } from 'react-loading-hook'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth'
import { getFirebaseAuth } from '../auth/firebase'
import { PasswordFormValue } from '../../components/PasswordForm/PasswordForm'
import { useRedirectParam } from '../../lib/useRedirectParam'
import { useRedirect } from '../../lib/useRedirect'
import { getGoogleProvider, loginWithProvider } from './firebase'
import { AuthenticationHeader } from '@/components/Authentication/authentication-header'
import { AuthenticationFooter } from '@/components/Authentication/authentication-footer'
import { RegisterMainContent } from '@/components/Authentication/register-main-content'
import { AuthRedirecting } from '@/components/Authentication/authentication-redirecting'

export function RegisterPage() {
  const [hasLogged, setHasLogged] = React.useState(false)
  const redirect = useRedirectParam()
  useRedirect()

  const [registerWithEmailAndPassword, isRegisterLoading, error] =
    useLoadingCallback(async ({ email, password }: PasswordFormValue) => {
      setHasLogged(false)
      const auth = getFirebaseAuth()
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(credential.user)
      setHasLogged(true)
    })

  const [handleRegisterWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      setHasLogged(false)
      const auth = getFirebaseAuth()
      await loginWithProvider(auth, getGoogleProvider(auth))
      setHasLogged(true)
    })

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <AuthenticationHeader />
      {hasLogged ? (
        <AuthRedirecting />
      ) : (
        <RegisterMainContent
          registerWithEmailAndPassword={registerWithEmailAndPassword}
          isRegisterLoading={isRegisterLoading}
          error={error}
          handleRegisterWithGoogle={handleRegisterWithGoogle}
          isGoogleLoading={isGoogleLoading}
        />
      )}
      <AuthenticationFooter />
    </div>
  )
}
