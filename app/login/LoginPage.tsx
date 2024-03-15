'use client'

import * as React from 'react'
import { useLoadingCallback } from 'react-loading-hook'
import { getGoogleProvider, loginWithProvider } from './firebase'
import styles from './login.module.css'
import { Button } from '../../components/Button'
import { LoadingIcon } from '../../components/icons'
import Link from 'next/link'
import { ButtonGroup } from '../../components/ButtonGroup'
import { MainTitle } from '../../components/MainTitle'
import { PasswordForm } from '../../components/PasswordForm'
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

export function LoginPage() {
  const [hasLogged, setHasLogged] = React.useState(false)
  const redirect = useRedirectParam()

  console.log('redirect', redirect)
  console.log('hasLogged', hasLogged)
  useRedirect()

  const [handleLoginWithEmailAndPassword, isEmailLoading, emailPasswordError] =
    useLoadingCallback(async ({ email, password }: PasswordFormValue) => {
      setHasLogged(false)

      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)

      setHasLogged(true)
    })

  const [handleLoginWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      setHasLogged(false)

      const auth = getFirebaseAuth()
      await loginWithProvider(auth, getGoogleProvider(auth))

      setHasLogged(true)
    })

  const [handleLoginWithEmailLink, isEmailLinkLoading, emailLinkError] =
    useLoadingCallback(async () => {
      const auth = getFirebaseAuth()
      const email = window.prompt('Please provide your email')

      if (!email) {
        return
      }

      window.localStorage.setItem('emailForSignIn', email)

      await sendSignInLinkToEmail(auth, email, {
        url: process.env.NEXT_PUBLIC_ORIGIN + '/login',
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
    <div className={styles.page}>
      <MainTitle>Login</MainTitle>
      {hasLogged && (
        <div className={styles.info}>
          <span>
            Redirecting to <strong>{redirect || '/'}</strong>
          </span>
          <LoadingIcon />
        </div>
      )}
      {!hasLogged && (
        <PasswordForm
          loading={isEmailLoading}
          onSubmit={handleLoginWithEmailAndPassword}
          error={emailPasswordError || googleError || emailLinkError}
        >
          <ButtonGroup>
            <Link
              className={styles.link}
              href={appendRedirectParam('/reset-password', redirect)}
            >
              Reset password
            </Link>
            <Link href={appendRedirectParam('/register', redirect)}>
              <Button>Register</Button>
            </Link>
            <Button
              loading={isGoogleLoading}
              disabled={isGoogleLoading}
              onClick={handleLoginWithGoogle}
            >
              Log in with Google
            </Button>
            <Button
              loading={isEmailLinkLoading}
              disabled={isEmailLinkLoading}
              onClick={handleLoginWithEmailLink}
            >
              Log in with Email Link
            </Button>
          </ButtonGroup>
        </PasswordForm>
      )}
    </div>
  )
}
