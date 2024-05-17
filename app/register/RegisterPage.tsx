'use client'
import * as React from 'react'
import { useLoadingCallback } from 'react-loading-hook'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth'
import { getFirebaseAuth } from '@/app/auth/firebase'
import { PasswordFormValue } from '../../components/PasswordForm/PasswordForm'
import { useRedirectParam } from '../../lib/useRedirectParam'
import { useRedirect } from '../../lib/useRedirect'
import { getGoogleProvider, loginWithProvider } from '@/app/auth/firebase'
import { AuthenticationHeader } from '@/components/Authentication/authentication-header'
import { AuthenticationFooter } from '@/components/Authentication/authentication-footer'
import { RegisterMainContent } from '@/components/Authentication/register-main-content'
import { AuthRedirecting } from '@/components/Authentication/authentication-redirecting'
import { nanoid } from 'nanoid'
import { useRedirectAfterLogin } from '@/lib/userRedirectAfterLogin'
import { useAuth } from '@/app/auth/AuthContext'
import { toUserFromCredentials } from '@/lib/user'
import { login } from '@/app/auth'

export function RegisterPage() {
  const [hasLogged, setHasLogged] = React.useState(false)
  const { user, setUser } = useAuth() // this is a hook to update the context after we have authenticated

  // This checks in the URL if we already specified where we want to redirect
  // If authenticated, redirect to new chat
  const definedRedirectPath = useRedirectParam()
  const newChatRedirectPath = `/chat/${nanoid()}`
  const redirectPath = definedRedirectPath || newChatRedirectPath
  // const redirectAfterLogin = useRedirectAfterLogin(redirectPath)
  // useRedirect(redirectPath) // should already be done by the middleware

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
      // Listen for the user's email verification status
      const unsubscribe = onAuthStateChanged(auth, async user => {
        if (user && user.emailVerified) {
          // Set user as logged in only after email is verified
          setHasLogged(true)
          unsubscribe() // Stop listening to auth state changes
          // Redirect after email verification
          useRedirect(redirectPath)
        }
      })
    })

  const [handleRegisterWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      const auth = getFirebaseAuth()
      setHasLogged(true)
      const credential = await loginWithProvider(auth, getGoogleProvider(auth))
      const idTokenResult = await credential.user.getIdTokenResult()
      await login(idTokenResult.token)
      setUser(toUserFromCredentials(credential.user, idTokenResult)) // Update context with user info
      useRedirect(redirectPath)
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
