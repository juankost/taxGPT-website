'use client'

import * as React from 'react'
import { useLoadingCallback } from 'react-loading-hook'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth'
import Link from 'next/link'
import { getFirebaseAuth } from '../auth/firebase'
import { Button } from '../../components/Button'
import { MainTitle } from '../../components/MainTitle'
import { PasswordForm } from '../../components/PasswordForm'
import { PasswordFormValue } from '../../components/PasswordForm/PasswordForm'
import { LoadingIcon } from '../../components/icons'
import { appendRedirectParam } from '../../lib/redirect'
import { useRedirectParam } from '../../lib/useRedirectParam'
import styles from './register.module.css'
import { useRedirect } from '../../lib/useRedirect'

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

  return (
    <div className={styles.page}>
      <MainTitle>Register</MainTitle>
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
          onSubmit={registerWithEmailAndPassword}
          loading={isRegisterLoading}
          error={error}
        >
          <Link href={appendRedirectParam('/login', redirect)}>
            <Button disabled={isRegisterLoading}>Back to login</Button>
          </Link>
        </PasswordForm>
      )}
    </div>
  )
}
