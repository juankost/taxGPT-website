'use client'

import * as React from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import Link from 'next/link'
import { useLoadingCallback } from 'react-loading-hook'
import { getFirebaseAuth } from '../auth/firebase'
import { Button } from '../../components/Button'
import { FormError } from '../../components/FormError'
import { Input } from '../../components/Input'
import { MainTitle } from '../../components/MainTitle'
import { appendRedirectParam } from '../../lib/redirect'
import { useRedirectParam } from '../../lib/useRedirectParam'
import styles from './ResetPasswordPage.module.css'

export function ResetPasswordPage() {
  const [email, setEmail] = React.useState('')
  const [isSent, setIsSent] = React.useState(false)
  const redirect = useRedirectParam()
  const [sendResetInstructions, loading, error] = useLoadingCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      event.stopPropagation()

      const auth = getFirebaseAuth()
      setIsSent(false)
      await sendPasswordResetEmail(auth, email)
      setEmail('')
      setIsSent(true)
    }
  )

  return (
    <div className={styles.page}>
      <MainTitle>Reset password</MainTitle>
      <form onSubmit={sendResetInstructions} className={styles.form}>
        <Input
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email address"
        />
        {isSent && (
          <p className={styles.info}>Instructions sent. Check your email.</p>
        )}
        {error && <FormError>{error?.message}</FormError>}
        <Button
          loading={loading}
          disabled={loading}
          variant="contained"
          type="submit"
        >
          Send reset instructions
        </Button>
        <Link href={appendRedirectParam('/login', redirect)}>
          <Button disabled={loading}>Back to login</Button>
        </Link>
      </form>
    </div>
  )
}
