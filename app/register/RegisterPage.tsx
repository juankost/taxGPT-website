'use client'
import * as React from 'react'
import { useLoadingCallback } from 'react-loading-hook'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth'
import { getFirebaseAuth } from '@/app/auth/firebase'
import { PasswordFormValue } from '@/components/PasswordForm/PasswordForm'
import { useRedirectParam } from '@/lib/useRedirectParam'
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
import { useTheme } from 'next-themes'
import { logout as logoutCookie } from '@/app/auth'
import { logout as logoutProvider } from '@/app/auth/firebase'
import { EmailVerificationDialog } from '@/components/Authentication/email-not-verified-popup'

export function RegisterPage() {
  const [hasLogged, setHasLogged] = React.useState(false)
  const { user, setUser } = useAuth() // this is a hook to update the context after we have authenticated
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const { resolvedTheme } = useTheme()

  // This checks in the URL if we already specified where we want to redirect
  // If authenticated, redirect to new chat
  const definedRedirectPath = useRedirectParam()
  const newChatRedirectPath = `/chat/${nanoid()}`
  const redirectPath = definedRedirectPath || newChatRedirectPath
  const redirectBeforeVerification = useRedirectAfterLogin('/')
  const redirectAfterRegister = useRedirectAfterLogin(redirectPath)

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
      setIsModalOpen(true) // Open the modal
    })

  const [handleRegisterWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      const auth = getFirebaseAuth()
      setHasLogged(true)
      const credential = await loginWithProvider(auth, getGoogleProvider(auth))
      const idTokenResult = await credential.user.getIdTokenResult()
      await login(idTokenResult.token)
      setUser(toUserFromCredentials(credential.user, idTokenResult)) // Update context with user info
      redirectAfterRegister()
    })

  const closeModal = () => {
    setIsModalOpen(false)
    logoutProvider(getFirebaseAuth())
    logoutCookie()
    redirectBeforeVerification()
  }

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <AuthenticationHeader theme={resolvedTheme} />
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
      <EmailVerificationDialog isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
