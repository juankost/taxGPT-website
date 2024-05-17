'use client'
import * as React from 'react'
import { getGoogleProvider, loginWithProvider } from '@/app/auth/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getFirebaseAuth } from '@/app/auth/firebase'
import { login } from '@/app/auth'
import { logout as logoutCookie } from '@/app/auth'
import { logout as logoutProvider } from '@/app/auth/firebase'

import { nanoid } from 'nanoid'
import { appendRedirectParam } from '../../lib/redirect'
import { toUserFromCredentials } from '@/lib/user'

import { useLoadingCallback } from 'react-loading-hook'
import { useRedirect } from '../../lib/useRedirect'
import { useRedirectParam } from '../../lib/useRedirectParam'
import {
  useRedirectAfterLogin,
  useRedirectAfterLogout
} from '@/lib/userRedirectAfterLogin'
import { useAuth } from '../auth/AuthContext'

import { PasswordFormValue } from '../../components/PasswordForm/PasswordForm'
import { AuthenticationHeader } from '@/components/Authentication/authentication-header'
import { AuthenticationFooter } from '@/components/Authentication/authentication-footer'
import { AuthRedirecting } from '@/components/Authentication/authentication-redirecting'
import { LoginMainContent } from '@/components/Authentication/login-main-content'
import { LoginEmailLinkContent } from '@/components/Authentication/login-email-link'
import { useTheme } from 'next-themes'
import { EmailVerificationDialog } from '@/components/Authentication/email-not-verified-popup'

export function LoginPage() {
  const [hasLogged, setHasLogged] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [showEmailLinkLogin, setShowEmailLinkLogin] = React.useState(false)
  const { user, setUser } = useAuth() // this is a hook to update the context after we have authenticated
  const { resolvedTheme } = useTheme()

  // This checks in the URL if we already specified where we want to redirect
  // If authenticated, redirect to new chat
  const definedRedirectPath = useRedirectParam()
  const newChatRedirectPath = `/chat/${nanoid()}`
  const redirectPath = definedRedirectPath || newChatRedirectPath
  const redirectToChat = useRedirectAfterLogin(redirectPath)
  const redirectToHome = useRedirectAfterLogout()

  // Event handler for Email & Password login
  const [handleLoginWithEmailAndPassword, isEmailLoading, emailPasswordError] =
    useLoadingCallback(async ({ email, password }: PasswordFormValue) => {
      setHasLogged(true)
      const auth = getFirebaseAuth()
      const credential = await signInWithEmailAndPassword(auth, email, password)
      if (!credential.user.emailVerified) {
        console.log('Email not verified')
        setIsModalOpen(true)
        return
      }
      const idTokenResult = await credential.user.getIdTokenResult()
      await login(idTokenResult.token)
      setUser(toUserFromCredentials(credential.user, idTokenResult))
      redirectToChat()
    })

  // Event handler for Google login
  const [handleLoginWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      const auth = getFirebaseAuth()
      setHasLogged(true)
      const credential = await loginWithProvider(auth, getGoogleProvider(auth))
      const idTokenResult = await credential.user.getIdTokenResult()
      await login(idTokenResult.token)
      setUser(toUserFromCredentials(credential.user, idTokenResult)) // Update context with user info
      redirectToChat()
    })

  const handleShowEmailLinkLogin = () => {
    setShowEmailLinkLogin(true)
  }

  const closeModal = () => {
    logoutProvider(getFirebaseAuth())
    // logoutCookie()
    setIsModalOpen(false)
    redirectToHome()
  }
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <AuthenticationHeader theme={resolvedTheme} />
      {hasLogged ? (
        <AuthRedirecting />
      ) : showEmailLinkLogin ? (
        <LoginEmailLinkContent
          onBackToLogin={() => setShowEmailLinkLogin(false)}
        />
      ) : (
        <>
          <LoginMainContent
            isEmailLoading={isEmailLoading}
            handleLoginWithEmailAndPassword={handleLoginWithEmailAndPassword}
            emailPasswordError={emailPasswordError}
            googleError={googleError}
            isGoogleLoading={isGoogleLoading}
            handleLoginWithGoogle={handleLoginWithGoogle}
            handleShowEmailLinkLogin={() => handleShowEmailLinkLogin()}
            redirect={redirectPath || ''}
            appendRedirectParam={appendRedirectParam}
          />
        </>
      )}
      <AuthenticationFooter />
      <EmailVerificationDialog isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
