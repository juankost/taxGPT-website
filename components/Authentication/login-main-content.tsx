import React from 'react'
import { PasswordForm } from '../PasswordForm'
import Link from 'next/link'
import { Button } from '../Button'
import { IconGoogle } from '@/components/Common/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { PasswordFormValue } from '../PasswordForm/PasswordForm'
import { FirebaseError } from '@firebase/util'

interface LoginMainContentProps {
  isEmailLoading: boolean
  handleLoginWithEmailAndPassword: (value: PasswordFormValue) => void
  emailPasswordError: FirebaseError | undefined
  googleError: FirebaseError | undefined
  isGoogleLoading: boolean
  handleLoginWithGoogle: () => void
  isEmailLinkLoading: boolean
  handleLoginWithEmailLink: () => void
  redirect: string
  appendRedirectParam: (url: string, param: string) => string
}
const LoginMainContent: React.FC<LoginMainContentProps> = ({
  isEmailLoading,
  handleLoginWithEmailAndPassword,
  emailPasswordError,
  googleError,
  isGoogleLoading,
  handleLoginWithGoogle,
  isEmailLinkLoading,
  handleLoginWithEmailLink,
  redirect,
  appendRedirectParam
}) => (
  <main className="flex flex-col justify-center items-center">
    <section className="w-84 mx-auto">
      <div className="flex flex-col items-center my-5 p-10 pt-10 pb-6 box-content">
        <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-bold">
          Welcome back
        </h2>
      </div>
      <div>
        <PasswordForm
          loading={isEmailLoading}
          onSubmit={handleLoginWithEmailAndPassword}
          error={emailPasswordError || googleError}
        ></PasswordForm>
        <Link
          className="flex justify-end text-xs underline my-1"
          href={appendRedirectParam('/reset-password', redirect)}
        >
          Reset password
        </Link>
        <div className="divider-wrapper flex flex-row uppercase border-none text-xs font-normal m-0 p-0 pb-6 pt-3 items-center justify-center w-84 align-baseline">
          <hr className="flex-auto border-b border-gray-300 mr-2 my-0" />
          <span>Or</span>
          <hr className="flex-auto border-b border-gray-300 ml-2 my-0" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button
            loading={isGoogleLoading}
            disabled={isGoogleLoading}
            onClick={handleLoginWithGoogle}
          >
            <span>
              <IconGoogle />
            </span>
            <span>Continue with Google</span>
          </Button>
          <Button
            loading={isEmailLinkLoading}
            disabled={isEmailLinkLoading}
            onClick={handleLoginWithEmailLink}
          >
            <span>
              <FontAwesomeIcon
                icon={faEnvelope} // "envelope"
                size="lg"
                style={{ fontSize: '22px' }}
              />
            </span>
            <span>Continue with Email Link</span>
          </Button>
        </div>
      </div>
    </section>
  </main>
)

export { LoginMainContent }
