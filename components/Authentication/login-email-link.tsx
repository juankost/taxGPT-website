import React, { useState } from 'react'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { getFirebaseAuth } from '@/app/auth/firebase'
import { Button } from '@/components/Button/button'
import { Input } from '@/components/Input/Input'
import { FormError } from '@/components/FormError/FormError'
import { useLoadingCallback } from 'react-loading-hook'

interface EmailLinkLoginProps {
  onBackToLogin: () => void
}

const LoginEmailLinkContent: React.FC<EmailLinkLoginProps> = ({
  onBackToLogin
}) => {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [isLoading, setLoading] = useState(false)

  // Event handler for Email Link login
  const [handleLoginWithEmailLink, isEmailLinkLoading, emailLinkError] =
    useLoadingCallback(async () => {
      setLoading(true)
      const auth = getFirebaseAuth()
      await sendSignInLinkToEmail(auth, email, {
        url: process.env.NEXT_PUBLIC_SERVER_URL + '/login',
        handleCodeInApp: true
      })
      setEmailSent(true)
      setLoading(false)
    })

  if (emailSent) {
    return (
      <main className="flex flex-col justify-center items-center">
        <section className="w-84 mx-auto">
          <div className="flex flex-col items-center my-5 p-10 pb-6 box-content">
            <div className="flex flex-col gap-8">
              <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300 ">
                Please check your email for the login link.
              </p>
              <Button
                onClick={onBackToLogin}
                variant="outlined"
                center_text={true}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <section className="w-84 mx-auto">
        <div className="flex flex-col items-center my-5 p-10 pb-6 box-content">
          <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-bold">
            Email link login
          </h2>
        </div>
        <form
          onSubmit={handleLoginWithEmailLink}
          className="flex flex-col gap-4"
        >
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            className="'w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500'"
          />
          <Button
            loading={isLoading && !emailLinkError}
            disabled={isLoading && !emailLinkError}
            onClick={handleLoginWithEmailLink}
            variant="contained"
            type="submit"
          >
            {isLoading && !emailLinkError ? 'Sending...' : 'Send Login link'}
          </Button>
          {emailLinkError && <FormError>{emailLinkError.message}</FormError>}
          <Button onClick={onBackToLogin} variant="outlined" center_text={true}>
            Back to Login
          </Button>
        </form>
      </section>
    </main>
  )
}

export { LoginEmailLinkContent }
