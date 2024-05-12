'use client'
import * as React from 'react'
import { useLoadingCallback } from 'react-loading-hook'
import { getGoogleProvider, loginWithProvider } from './firebase'
import { PasswordFormValue } from '../../components/PasswordForm/PasswordForm'
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink
} from 'firebase/auth'
import { getFirebaseAuth } from '../auth/firebase'
import { appendRedirectParam } from '../../lib/redirect'
import { useRedirect } from '../../lib/useRedirect'
import { useRedirectParam } from '../../lib/useRedirectParam'
import { useAuth } from '../auth/AuthContext'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/server-config'
import { AuthenticationHeader } from '@/components/Authentication/authentication-header'
import { AuthenticationFooter } from '@/components/Authentication/authentication-footer'
import { AuthRedirecting } from '@/components/Authentication/authentication-redirecting'
import { LoginMainContent } from '@/components/Authentication/login-main-content'
import { useAuthHandlers } from '@/hooks/useAuthHandlers'

export function LoginPage() {
  const [hasLogged, setHasLogged] = React.useState(false)
  const { auth, setAuth } = useAuth() // this is a hook to update the context after we have authenticated
  const redirect = useRedirectParam() // TODO (juan): understand the useRedirectParam hook and if we actually need it
  useRedirect() // TODO (juan): understand the useRedirect hook and if we actually need it

  // Event handler for Email & Password login
  const [handleLoginWithEmailAndPassword, isEmailLoading, emailPasswordError] =
    useLoadingCallback(async ({ email, password }: PasswordFormValue) => {
      setHasLogged(false)
      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
      const tokens = await getTokens(cookies(), authConfig)
      setAuth({ ...auth, tokens })
      setHasLogged(true)
    })

  // Event handler for Google login
  const [handleLoginWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      setHasLogged(false)
      const auth = getFirebaseAuth()
      console.log('auth', auth)
      await loginWithProvider(auth, getGoogleProvider(auth))
      const tokens = await getTokens(cookies(), authConfig)
      console.log('tokens', tokens)
      setAuth({ ...auth, tokens })
      setHasLogged(true)
    })

  // Event handler for Email Link login
  const [handleLoginWithEmailLink, isEmailLinkLoading, emailLinkError] =
    useLoadingCallback(async () => {
      const auth = getFirebaseAuth()
      const email = window.prompt('Please provide your email')
      if (!email) {
        return
      }
      window.localStorage.setItem('emailForSignIn', email)
      await sendSignInLinkToEmail(auth, email, {
        url: process.env.NEXT_PUBLIC_SERVER_URL + '/login',
        handleCodeInApp: true
      })
    })

  async function handleLoginWithEmailLinkCallback() {
    const auth = getFirebaseAuth()
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      return
    }

    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      email = window.prompt('Please provide your email for confirmation')
    }

    if (!email) {
      return
    }

    setHasLogged(false)
    await signInWithEmailLink(auth, email, window.location.href)
    window.localStorage.removeItem('emailForSignIn')
    setHasLogged(true)
  }

  React.useEffect(() => {
    handleLoginWithEmailLinkCallback()
  }, [])

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <AuthenticationHeader />
      {hasLogged ? (
        <AuthRedirecting />
      ) : (
        <LoginMainContent
          isEmailLoading={isEmailLoading}
          handleLoginWithEmailAndPassword={handleLoginWithEmailAndPassword}
          emailPasswordError={emailPasswordError}
          googleError={googleError}
          isGoogleLoading={isGoogleLoading}
          handleLoginWithGoogle={handleLoginWithGoogle}
          isEmailLinkLoading={isEmailLinkLoading}
          handleLoginWithEmailLink={handleLoginWithEmailLink}
          redirect={redirect || ''}
          appendRedirectParam={appendRedirectParam}
        />
      )}
      <AuthenticationFooter />
    </div>
  )
}
