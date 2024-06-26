'use client'

import React from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useLoadingCallback } from 'react-loading-hook'
import { getFirebaseAuth } from '@/app/auth/firebase'
import { useRedirectParam } from '@/lib/useRedirectParam'
import { AuthenticationHeader } from '@/components/Authentication/authentication-header'
import { AuthenticationFooter } from '@/components/Authentication/authentication-footer'
import { ResetPasswordMainContent } from '@/components/Authentication/reset-main-content'
import { useTheme } from 'next-themes'

export function ResetPasswordPage() {
  const [email, setEmail] = React.useState('')
  const [isSent, setIsSent] = React.useState(false)
  const redirect = useRedirectParam()
  const { resolvedTheme } = useTheme()
  const [sendResetInstructions, loading, error] = useLoadingCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      event.stopPropagation()

      const auth = getFirebaseAuth()
      setIsSent(false)
      const currentUrl = window.location.origin
      await sendPasswordResetEmail(auth, email, {
        url: `${currentUrl}/login`
      })
      setEmail('')
      setIsSent(true)
    }
  )

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <AuthenticationHeader theme={resolvedTheme} />
      <ResetPasswordMainContent
        email={email}
        setEmail={setEmail}
        sendResetInstructions={sendResetInstructions}
        loading={loading}
        error={error}
        isSent={isSent}
        redirect={redirect}
      />
      <AuthenticationFooter />
    </div>
  )
}
