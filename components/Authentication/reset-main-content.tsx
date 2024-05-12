'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '../../components/Button'
import { FormError } from '../../components/FormError'
import { Input } from '../../components/Input'
import { MainTitle } from '../../components/MainTitle'
import { appendRedirectParam } from '../../lib/redirect'

interface ResetPasswordMainContentProps {
  email: string
  setEmail: (email: string) => void
  sendResetInstructions: (event: React.FormEvent) => Promise<void>
  loading: boolean
  error: any
  isSent: boolean
  redirect: string | null
}

const ResetPasswordMainContent: React.FC<ResetPasswordMainContentProps> = ({
  email,
  setEmail,
  sendResetInstructions,
  loading,
  error,
  isSent,
  redirect
}) => {
  return (
    <main className="flex flex-col justify-center items-center">
      <section className="w-84 mx-auto">
        <div className="flex flex-col items-center my-5 p-10 pt-10 pb-6 box-content">
          <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-bold">
            Reset password
          </h2>
        </div>
        <form onSubmit={sendResetInstructions} className="flex flex-col gap-4">
          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Email address"
          />
          {isSent && (
            <p className="flex items-center m-0">
              Instructions sent. Check your email.
            </p>
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
            <Button disabled={loading} center_text={true}>
              Back to login
            </Button>
          </Link>
        </form>
      </section>
    </main>
  )
}

export { ResetPasswordMainContent }
